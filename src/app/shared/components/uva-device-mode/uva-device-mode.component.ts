import { Component, OnChanges, SimpleChange, OnInit, SimpleChanges } from '@angular/core';
import { RollingEnvironmentalData } from '../../../core/services/service.model';
import { EnvironmentData, EnvironmentService } from '../../../core/services/environment/environment.service';
import { DeviceService,  } from '../../../core/services/device/device.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
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
export class UvaDeviceModeComponent implements OnInit, OnChanges {
  public totalAq: number;
  public deviceMode: DeviceMode;
  public deviceImage: string;
  public manualEnviroData: EnvironmentData;
  unsubscribe$: Subject<EnvironmentData> = new Subject();

  public autoEnviroData: RollingEnvironmentalData

  private $isManualMode: BehaviorSubject<boolean>
  public isManualMode: boolean = false;
  unsubscribeManualMode$: Subject<boolean> = new Subject();

  constructor(private manualEnviroService: EnvironmentService) { }

  ngOnInit(): void {
    this.manualEnviroService.isManualMode
      .pipe(takeUntil(this.unsubscribeManualMode$))
      .subscribe(isManualMode => {
        if(isManualMode) {
          this.manualEnviroService.environmentData
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(environmentData => {
            this.totalAq = environmentData.total;
            this.getDeviceMode();
          });
        } else {
          console.log('In UvaDeviceModeComponent: Need to grab data from device service')
        }
  

      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`UvaDeviceModeComponent.ngOnChanges ${JSON.stringify(changes, null, 2)}`)
  }

  getDeviceMode(): void {
    if (this.totalAq === 0 ) {
      this.deviceMode = DeviceMode.OFF;
      this.deviceImage = 'fan-off.svg';
    } else if (this.totalAq < 33 ) {
      this.deviceMode = DeviceMode.LOW;
    } else if (this.totalAq < 66 ) {
      this.deviceMode = DeviceMode.MEDIUM;
    } else {
      this.deviceMode = DeviceMode.HIGH;
    }
  }
}
