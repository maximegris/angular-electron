import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `App works !`;

  constructor() {
    // Check if electron is correctly injected (see externals in webpack.config.js)
    console.log('c', ipcRenderer);
    // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
    console.log('c', childProcess);

  }
}
