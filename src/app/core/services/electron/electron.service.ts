import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, session, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';


@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  session: typeof session;
  BrowserWindow: typeof BrowserWindow;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.session = window.require('electron').session;
      this.BrowserWindow = window.require('electron').remote.BrowserWindow;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }
  StealthMobileBrowserWindow() {
    
  };
  createStealthMobileBrowserWindow(): BrowserWindow {
    let b = new this.BrowserWindow({
      width: 375,
      height: 667,
      parent: this.BrowserWindow.getAllWindows()[0],
      webPreferences: {
        allowRunningInsecureContent: true
      }
    });
    b.on('closed', ()=>{
      b = null;
    });
    b['test'] = () => {console.log('test from stealth browser')};
    b['start'] = async () => {
      await b.loadURL('https://bot.sannysoft.com/');
    };
    return b;
  };
}
