import { Component, OnInit } from '@angular/core';
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

}
