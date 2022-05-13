import { app, BrowserWindow, screen, ipcMain } from 'electron';
import { SerialPort } from 'serialport';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');


let current_air20_fan_operation_mode = 0;
let serial_port: SerialPort;

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    
    // Surface Pro 7+ 12.3" display
    width: 2736,
    height: 1824,

    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

ipcMain.on('list_serial_ports', async (event: any) => {
  let serialPorts = await SerialPort.list()
  win.webContents.send('list_serial_ports_response', serialPorts)
})

ipcMain.on('set_serial_port', (event: any, path: string, baudRate: string) => {
  // serial_port = new SerialPort({ path: '/dev/tty-usbserial1', baudRate: 57600 })
  console.log(`attempting to open serial port: [${path}] @ baud rate [${parseInt(baudRate)}]`)
  if (serial_port) {
    serial_port.destroy();
  }
  serial_port = new SerialPort({ path: path, baudRate: parseInt(baudRate) }, function (err) {
    if (err) {
      console.log('SERIAL PORT ERROR: ', err.message)
      win.webContents.send('set_serial_port_response', JSON.stringify({ error: err.message }));
      return err.message
    }
    console.log("Serial Port Successfully Opened @ path: ", serial_port.path)
    win.webContents.send('set_serial_port_response', JSON.stringify({ error: null, serialPort: serial_port }));
  })
  serial_port.on('error', function (err) {
    if (err) {
      console.error(err);
      if (err['disconnect']) {
        win.webContents.send('serial_port_disconnect');
      } else {
        win.webContents.send('serial_port_error', err);
      }
    }
  })
})

ipcMain.on('get_active_serial_port', async (event: any): Promise<SerialPort | null> => {
  if (!serial_port) {
    return null
  }
  win.webContents.send('get_active_serial_port_response', serial_port);
})

ipcMain.on('air20_set_fan_operation_mode', (event: any, level: number) => {
  console.log(`SETTING AIR 2.0 FAN OPERATION MODE to [${level}]`)
  if (level <= 0) {
    current_air20_fan_operation_mode = 0
  } else if (level <= 1) {
    current_air20_fan_operation_mode = 1
  } else if (level <= 2) {
    current_air20_fan_operation_mode = 2
  } else if (level <= 3) {
    current_air20_fan_operation_mode = 3
  } else if (level <= 4) {
    current_air20_fan_operation_mode = 4
  } else if (level <= 5) {
    current_air20_fan_operation_mode = 5
  } else {
    current_air20_fan_operation_mode = 5
  }

  write_port(`fan_mode ${current_air20_fan_operation_mode}`)
})

function write_port(message): boolean {
  if (!serial_port.writable) {
    console.error("SERIAL PORT IS NOT WRITABLE! - ignoring write request. be sure port is opened and still valid")
    return false
  }

  serial_port.write(message, function (err) {
    if (err) {
      console.error('Error on write: ', err.message)
      return false
    }
    console.log('message written')
    return true
  })
}
