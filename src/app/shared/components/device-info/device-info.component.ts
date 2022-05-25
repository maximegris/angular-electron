import { Component, Input, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../core/abstract.component';
import { Device } from '../../../core/services/service.model';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent extends AbstractComponent implements OnInit {

  @Input()
  device: Device;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get deviceTypeHumanized() {
    switch (this.device?.type) {
      case 'AIR175':
        return 'UV Angel Clean Air';
      case 'AIR20':
        return 'UV Angel Air 2.0';
      case 'UVA20':
        return 'UV Angel Adapt';
    }
  }


}
