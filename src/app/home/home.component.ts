import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SerialPort } from 'serialport';
import { SerialCommunication } from '../core/services/serial-communication/serial-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  availablePorts: SerialPort[] = [];
  serialPortForm = this.fb.group({
    path: ['', [Validators.required]],
  });
  isSubmitted = false;
  activeSerialPort: SerialPort = null;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private router: Router,
    private serialCommunication: SerialCommunication,
    public fb: FormBuilder
  ) { }

  get path() {
    return this.serialPortForm.get('path');
  }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.serialCommunication.activeSerialPort
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(activeSerialPort => this.activeSerialPort = activeSerialPort);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  changeSerialPortPath(e: any) {
    this.path?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  async onSerialPortFormSubmit(): Promise<void> {
    console.log(this.serialPortForm);
    this.isSubmitted = true;
    if (this.serialPortForm.valid) {
      console.log(JSON.stringify(this.serialPortForm.value));
      try {
        const response = await this.serialCommunication.setSerialPort(this.serialPortForm.value.path);
        const serialPort = response.serialPort;
        console.log('set serial port!!', serialPort.settings.path);
        new Notification('SUCCESS', {
          body: `serial port opened @ ${serialPort.settings.path}`
        });
      } catch (err) {
        this.serialPortForm.reset();
        this.isSubmitted = false;
        console.error('error setting serial port', err.error);
        new Notification('ERROR', {
          body: `error setting serial port: ${err.error}`
        });
      }
    }
  }

  async listSerialPorts() {
    this.availablePorts = await this.serialCommunication.listSerialPorts();
  }

  fanOperationModeTest = (value: number) => {
    this.serialCommunication.writeToActiveSerialPort('air20_set_fan_operation_mode', value);
  };
}
