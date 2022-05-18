import { Component, OnInit } from '@angular/core';
import { EnvironmentData, EnvironmentService } from '../../../core/services/environment/environment.service';
import { Subject, takeUntil } from 'rxjs';
import { off } from 'process';

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
export class UvaDeviceModeComponent implements OnInit {
  public totalAq: number;
  public deviceMode: DeviceMode;
  public environmentData: EnvironmentData;
  unsubscribe$: Subject<EnvironmentData> = new Subject();

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.environmentService.environmentData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(environmentData => {
        this.totalAq = environmentData.total;
        this.getDeviceMode();
      });
  }

  getDeviceMode(): void {
    if (this.totalAq === 0 ) {
      this.deviceMode = DeviceMode.OFF;
    } else if (this.totalAq < 33 ) {
      this.deviceMode = DeviceMode.LOW;
    } else if (this.totalAq < 66 ) {
      this.deviceMode = DeviceMode.MEDIUM;
    } else {
      this.deviceMode = DeviceMode.HIGH;
    }
  }
}
