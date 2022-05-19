import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SerialPort } from 'serialport';
import { ElectronService } from '../electron/electron.service';

const LOCAL_STORAGE_SERIAL_PATH = 'serial-communication.preferred-path';
const LOCAL_STORAGE_SERIAL_BAUD = 'serial-communication.preferred-baudRate';
const DEFAULT_BAUD_RATE = 9600;

@Injectable({
  providedIn: 'root'
})
export class SerialCommunication {

  private $activeSerialPort: BehaviorSubject<SerialPort> = new BehaviorSubject(null);
  private serialPortErrorOccurred: boolean = false;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly activeSerialPort: Observable<SerialPort> = this.$activeSerialPort.asObservable();

  constructor(
    private electronService: ElectronService,
    private ngZone: NgZone
  ) {
    setInterval(() => {
      if (!this.$activeSerialPort.value) {
        // console.log('attempting to connect to preset ports...');
        this.hydratePreSetSerialPortIfExists();
      }
    }, 2000);

    electronService.ipcRenderer.on('serial_port_disconnect', () => {
      console.log('SERIAL PORT WAS DISCONNECTED!!!');
      new Notification('Device Disconnected', {
        body: `serial port disconnected`
      });
      this.serialPortErrorOccurred = true;
      this.$activeSerialPort.next(null);
    });

    electronService.ipcRenderer.on('serial_port_error', (event, error) => {
      console.log('serial port error occurred', error);
      new Notification('Device Error', {
        body: `serial port error: ${error}`
      });
      this.serialPortErrorOccurred = true;
      this.$activeSerialPort.next(null);
    });
  }

  writeToActiveSerialPort = (event: string, data: number): void => {
    this.electronService.ipcRenderer.send(event, data);
  };

  setSerialPort = async (path: string, baudRate: number = DEFAULT_BAUD_RATE): Promise<{ error: string; serialPort: SerialPort }> => {
    this.electronService.ipcRenderer.send('set_serial_port', path, baudRate.toString());

    return new Promise((resolve, reject) => {
      this.electronService.ipcRenderer.once('set_serial_port_response', (event, response) => {
        const jsonResponse = JSON.parse(response) as { error: string; serialPort: SerialPort };
        this.ngZone.run(() => {
          if (jsonResponse.error) {
            if (!this.serialPortErrorOccurred) {
              new Notification('ERROR', {
                body: `error setting serial port: ${jsonResponse.error}`
              });
            }
            this.serialPortErrorOccurred = true;
            reject(jsonResponse);
          } else {
            this.serialPortErrorOccurred = false;

            localStorage.setItem(LOCAL_STORAGE_SERIAL_PATH, path);
            localStorage.setItem(LOCAL_STORAGE_SERIAL_BAUD, baudRate.toString());

            // set the active serial port observable so everyone can grab it whenever
            this.$activeSerialPort.next(jsonResponse.serialPort);
            new Notification('SUCCESS', {
              body: `serial port opened @ ${jsonResponse.serialPort.settings.path}`
            });
            resolve(jsonResponse);
          }
        });
      });
    });
  };

  // sends message to main process, wraps response once and returns in async fashion
  // also wraps resolved promise in `ngZone` so that we're automatically back in
  // angular process world ;)
  listSerialPorts = async (): Promise<SerialPort[]> => {
    this.electronService.ipcRenderer.send('list_serial_ports');

    return new Promise((resolve, reject) => {
      this.electronService.ipcRenderer.once('list_serial_ports_response', (event, args) => {
        this.ngZone.run(() => {
          if (args) {
            resolve(args);
          }
          reject(event);
        });
      });
    });
  };

  getActiveSerialPort = async (): Promise<SerialPort | null> => {
    this.electronService.ipcRenderer.send('get_active_serial_port');

    return new Promise((resolve, reject) => {
      this.electronService.ipcRenderer.once('get_active_serial_port_response', (event, serialPort: SerialPort) => {
        this.ngZone.run(() => {
          if (serialPort) {
            resolve(serialPort);
          }
          reject(event);
        });
      });
    });
  };

  private hydratePreSetSerialPortIfExists = async (): Promise<void> => {
    // console.log('Hydrating previously set serial port...');

    const storedPath = localStorage.getItem(LOCAL_STORAGE_SERIAL_PATH);

    if (!storedPath) {
      // no pre-existing path is stored, nothing to hydrate
      // console.log('no pre-existing serial path stored, nothing to hydrate. must set manually');
      return;
    }
    // console.log(`Found pre-set port path: ${storedPath}`);
    const availablePorts = await this.listSerialPorts();
    const port = availablePorts.find(p => p.path === storedPath);

    if (!port) {
      // console.log('Pre-existing serial port path not found. cannot hydrate. must set manually');
      return;
    }
    console.log(`Found pre-set port path found!`);

    const storedBaudString = localStorage.getItem(LOCAL_STORAGE_SERIAL_BAUD);
    let storedBaudNumber = DEFAULT_BAUD_RATE;
    if (storedBaudString) {
      storedBaudNumber = parseInt(storedBaudString, 10);
    }
    console.log(`Setting Serial Port: ${port.path} | ${storedBaudNumber}`);
    this.setSerialPort(port.path, storedBaudNumber);
  };

  private normalize(num, fromMin, fromMax, toMin, toMax) {
    return toMin + (num - fromMin) / (fromMax - fromMin) * (toMax - toMin)
  }
}
