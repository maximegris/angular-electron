import { Injectable } from '@angular/core';


// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as crypto from 'crypto';
import * as store from 'electron-store';
import * as fsJetpack from 'fs-jetpack';
import * as imageDownloader from 'image-downloader';
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

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.store = window.require('electron-store');
      this.jetpack = window.require('fs-jetpack');
      this.fs = window.require('fs');
      this.imageDownloader = window.require('image-downloader');
      this.moment = window.require('moment');
      this.version = require('../../../package.json').version;
      this.request = window.require('request');
      this.os = window.require('os');
      this.crypto = window.require('crypto');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
