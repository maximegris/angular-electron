import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  selectedPortPath: string = null;
  serialPortFormGroup = this.fb.group({
    path: ['', [Validators.required]],
  });
  editingSerialPort = false;
  isSubmitted = false;
  activeSerialPort: SerialPort = null;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private router: Router,
    private serialCommunication: SerialCommunication,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.serialCommunication.activeSerialPort
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(activeSerialPort => {
        this.activeSerialPort = activeSerialPort
        console.log("just set active serial port", this.activeSerialPort);
        if (this.activeSerialPort) {
          this.path.setValue(this.activeSerialPort.settings.path); 
        } else {
          this.path.setValue(null)
        }
      });
  }

  get path(): FormControl { return this.serialPortFormGroup.get("path") as FormControl }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  pathCompareFn(option1, option2) {
    console.log("COMPARE", option1, option2);
    return option1 == option2;
  }

  async onSerialPortFormSubmit(): Promise<void> {
    this.isSubmitted = true;
    if (this.serialPortFormGroup.valid) {
      console.log(JSON.stringify(this.serialPortFormGroup.value));
      try {
        const response = await this.serialCommunication.setSerialPort(this.serialPortFormGroup.value.path);
        const serialPort = response.serialPort;
        console.log('set serial port!!', serialPort.settings.path);
        this.editingSerialPort = false;
      } catch (err) {
        this.serialPortFormGroup.reset();
        this.isSubmitted = false;
        console.error('error setting serial port', err.error);
      }
    }
  }

  editSerialPortPath() {
    this.editingSerialPort = true;
    this.listSerialPorts();
  }
  async listSerialPorts() {
    this.availablePorts = await this.serialCommunication.listSerialPorts();
  }

  fanOperationModeTest = (value: number) => {
    this.serialCommunication.writeToActiveSerialPort('air20_set_fan_operation_mode', value);
  };
}
