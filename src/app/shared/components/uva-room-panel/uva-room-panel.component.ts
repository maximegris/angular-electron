import { Component, OnInit } from '@angular/core';
import { differenceInMinutes } from 'date-fns';
import { map, takeUntil, tap } from 'rxjs';
import { AbstractComponent } from '../../../core/abstract.component';
import { DeviceService } from '../../../core/services/device/device.service';
import { EnvironmentService } from '../../../core/services/environment/environment.service';
import { Device, FullLocation } from '../../../core/services/service.model';

@Component({
  selector: 'uva-room-panel',
  templateUrl: './uva-room-panel.component.html',
  styleUrls: ['./uva-room-panel.component.scss']
})
export class UvaRoomPanelComponent extends AbstractComponent implements OnInit {

  currentLocation: FullLocation;
  devices: Device[];

  constructor(
    private env: EnvironmentService,
    private deviceService: DeviceService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.env.currentLocation$.pipe(
      tap(location => this.currentLocation = location),
      map(location => this.deviceService.getDevicesInLocation(location.id)),
      takeUntil(this.destroyed$)
    ).subscribe(devices => {
      this.devices = devices;
    });
  }

  getTerminalCleaningCompliancePercentage() {
    let minutesDiff = differenceInMinutes(new Date(), this.currentLocation.uvcTerminalCleaning.lastCycle)
    let compliancePercentage = ((this.currentLocation.uvcTerminalCleaning.complianceDays - minutesDiff) / this.currentLocation.uvcTerminalCleaning.complianceDays) * 100
    if (compliancePercentage < 0) {
      compliancePercentage = 0
    }
    if (compliancePercentage > 100) {
      compliancePercentage = 100
    }
    return compliancePercentage
  }
}
