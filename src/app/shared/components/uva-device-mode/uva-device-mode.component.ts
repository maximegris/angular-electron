import { Component, OnChanges, SimpleChange, OnInit, SimpleChanges, Input } from '@angular/core';
import { Device, RollingEnvironmentalData } from '../../../core/services/service.model';
import { EnvironmentData, EnvironmentService } from '../../../core/services/environment/environment.service';
import { AbstractComponent } from '../../../core/abstract.component';
import { DeviceService } from '../../../core/services/device/device.service';
import { BehaviorSubject, Subject, takeUntil, Subscription } from 'rxjs';
import { isThisSecond } from 'date-fns';

enum DeviceMode {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  OFF = 'off',
}

@Component({
  selector: 'uva-device-mode',
  templateUrl: './uva-device-mode.component.html',
  styleUrls: ['./uva-device-mode.component.scss']
})
export class UvaDeviceModeComponent extends AbstractComponent implements OnInit {
  device: Device
  deviceSubscription: Subscription;
  public totalAq: number;
  public deviceMode: DeviceMode;
  public deviceImage: string;
  public manualEnviroData: EnvironmentData;
  unsubscribe$: Subject<EnvironmentData> = new Subject();

  public autoEnviroData: RollingEnvironmentalData

  private $isManualMode: BehaviorSubject<boolean>
  public isManualMode: boolean = false;
  unsubscribeManualMode$: Subject<boolean> = new Subject();

  constructor(private envService: EnvironmentService) {
    super();
  }

  ngOnInit(): void {
    this.envService.currentDevice$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(d => {
      let settingNewDevice: boolean = false;
      // if we are setting a device or changing devices, set up new subscription
      if (!this.device || (d.name && this.device?.name && d.name !== this.device?.name)) {
        settingNewDevice = true;
      }
      this.device = d;
      if (settingNewDevice) {
        this.deviceSubscription?.unsubscribe();
        this.deviceSubscription = this.device.environmentalData
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(envData => {

            this.totalAq = envData.total.data[59].value;
            this.getDeviceMode();
          });
      }
    });

    this.envService.isManualMode
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isManualMode => {
        console.log(`uva-device-panel manual mode = ${isManualMode}`)
        this.device.useOverrideValues = isManualMode
      });
    this.envService.environmentData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(environmentalData => {
        console.log('setting new env data overrides', environmentalData)
        this.device.setEnvironmentalOverrideData(environmentalData)
        this.getDeviceMode()
      })


  }

  getDeviceMode(): void {
    if (this.totalAq === 100 ) {
      this.deviceMode = DeviceMode.OFF;
      this.deviceImage = 'fan-off.svg';
    } else if (this.totalAq > 66 ) {
      this.deviceMode = DeviceMode.LOW;
    } else if (this.totalAq > 33 ) {
      this.deviceMode = DeviceMode.MEDIUM;
    } else {
      this.deviceMode = DeviceMode.HIGH;
    }
  }
}
