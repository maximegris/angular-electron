import { Component, OnInit } from '@angular/core';
import { map, switchMap, takeUntil, tap } from 'rxjs';
import { AbstractComponent } from '../../../core/abstract.component';
import { DeviceService } from '../../../core/services/device/device.service';
import { EnvironmentService } from '../../../core/services/environment/environment.service';
import { Device, FullLocation } from '../../../core/services/service.model';

@Component({
  selector: 'uva-floor-panel',
  templateUrl: './uva-floor-panel.component.html',
  styleUrls: ['./uva-floor-panel.component.scss'],
})
export class UvaFloorPanelComponent extends AbstractComponent implements OnInit {

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
