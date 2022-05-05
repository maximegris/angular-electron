import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SerialPort } from 'serialport';
import { ElectronService } from '../electron/electron.service';

const LOCAL_STORAGE_SERIAL_PATH = 'serial-communication.preferred-path';
const LOCAL_STORAGE_SERIAL_BAUD = 'serial-communication.preferred-baudRate';

@Injectable({
  providedIn: 'root'
})
export class SerialCommunication {

  private defaultBaudRate = 57600;

  private $activeSerialPort: BehaviorSubject<SerialPort> = new BehaviorSubject(null);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly activeSerialPort: Observable<SerialPort> = this.$activeSerialPort.asObservable();

  constructor(
    private electronService: ElectronService,
    private ngZone: NgZone
  ) { }

  writeToActiveSerialPort = (event: string, data: any): void => {
    this.electronService.ipcRenderer.send(event, data);
  };

  setSerialPort = async (path: string, baudRate: number = this.defaultBaudRate): Promise<{ error: string; serialPort: SerialPort }> => {
    this.electronService.ipcRenderer.send('set_serial_port', path, baudRate.toString());

    return new Promise((resolve, reject) => {
      this.electronService.ipcRenderer.once('set_serial_port_response', (event, response) => {
        const jsonResponse = JSON.parse(response) as { error: string; serialPort: SerialPort };
        this.ngZone.run(() => {
          if (jsonResponse.error) {
            reject(jsonResponse);
          }
          localStorage.setItem(LOCAL_STORAGE_SERIAL_PATH, path);
          localStorage.setItem(LOCAL_STORAGE_SERIAL_BAUD, baudRate.toString());

          // set the active serial port observable so everyone can grab it whenever
          this.$activeSerialPort.next(jsonResponse.serialPort);
          resolve(jsonResponse);
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
}
