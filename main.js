'use strict';

try {
  const electron = require('electron');
  // Module to control application life.
  const { app } = electron;
  // Module to create native browser window.
  const { BrowserWindow } = electron;

  let win, serve;
  const args = process.argv.slice(1);
  serve = args.some(val => val === "--serve");

  if (serve) {
    require('electron-reload')(__dirname + '/dist');
  }

  function createWindow() {

    let electronScreen = electron.screen;
    let size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height
    });

    let url = serve ?
      'file://' + __dirname + '/dist/index.html' :
      'file://' + __dirname + '/index.html';

    // and load the index.html of the app.
    win.loadURL(url);

    // Open the DevTools.
    if (serve) {
      win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });
  }


  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

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
}
