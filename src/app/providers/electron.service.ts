import { Injectable } from '@angular/core';


// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, clipboard } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as crypto from 'crypto';
import * as store from 'electron-store';
import * as fsJetpack from 'fs-jetpack';
import * as moment from 'moment';
import { request } from 'request';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  store: any;
  jetpack: any;
  imageDownloader: any;
  moment: any;
  version: any;
  request: typeof request;
  os: typeof os;
  crypto: typeof crypto;
  clipboard: typeof clipboard;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.clipboard = window.require('electron').clipboard;
      this.store = window.require('electron-store');
      this.jetpack = window.require('fs-jetpack');
      this.fs = window.require('fs');
      this.moment = window.require('moment');
      this.version = require('../../../package.json').version;
      this.request = window.require('request');
      this.os = window.require('os');
      this.crypto = window.require('crypto');
    }
    /**
     * @desc : on app close, delete the decrypted files from the OS temp directory
     */
    let win = this.remote.getCurrentWindow()
    win.addListener('close', (e) => {
      this.jetpack.remove(this.os.tmpdir() + '/' + 'dropstmp');
    })

    this.monitorClipboard();

  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  /**
   * @desc : Monitors clipboard for any Image objects,
   * If the app is open it will always clear the clipboard of Images
   */
  monitorClipboard() {
    let empty;
    setInterval(() => {
      empty = clipboard.readImage().isEmpty();
      if (!empty) {
        console.log('ClipBoard', empty)
        clipboard.clear();
        console.log('clipboard cleared')
      }

    }, 500);
  }

}
