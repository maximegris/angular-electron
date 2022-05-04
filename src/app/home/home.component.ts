import { ChangeDetectorRef, Component, OnInit, ViewRef } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { SerialPort } from 'serialport'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  availablePorts: SerialPort[] = [];

  constructor(private router: Router, private electronService: ElectronService) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');

    this.electronService.ipcRenderer.on('list_serial_ports_response', (event, args) => {
      console.log('RECIEVED PORTS', event, args);
      this.availablePorts = args;
    });
  }

  listSerialPorts() {
    console.log('ASKING FOR SERIAL PORTS');
    this.electronService.ipcRenderer.send('list_serial_ports');
  }
}
