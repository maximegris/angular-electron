import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { AbstractComponent } from '../../../core/abstract.component';
import { EnvironmentService } from '../../../core/services/environment/environment.service';
import { Device } from '../../../core/services/service.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { add } from 'date-fns';


@Component({
  selector: 'uva-device-panel',
  templateUrl: './uva-device-panel.component.html',
  styleUrls: ['./uva-device-panel.component.scss']
})

export class UvaDevicePanelComponent extends AbstractComponent implements OnInit {

  device: Device;
  deviceTypeHumanized: string;
  lampDaysLeft: number;
  filterDaysLeft: number;
  lampReplacementDate: Date;
  filterReplacementDate: Date;

  // These should be more that 365 because the device installation date is a random date 365 days in the past.
  readonly LAMP_LIFE_DAYS = 400;
  readonly FILTER_LIFE_DAYS = 500;

  constructor(
    private envService: EnvironmentService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log('UvaDevicePanel INIT');
    this.envService.currentDevice$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(d => {
      // TODO do any necessary preprocessing
      this.device = d;
      this.deviceTypeHumanized = this.humanizeDeviceType();
      const daysSinceInstallation = differenceInCalendarDays(new Date(), d.installationDate);
      this.lampDaysLeft = this.LAMP_LIFE_DAYS - daysSinceInstallation;
      this.filterDaysLeft = this.FILTER_LIFE_DAYS - daysSinceInstallation;
      this.lampReplacementDate = add(d.installationDate, { days: this.LAMP_LIFE_DAYS });
      this.filterReplacementDate = add(d.installationDate, { days: this.FILTER_LIFE_DAYS });
    });
  }

  humanizeDeviceType() {
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
