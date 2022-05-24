import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AbstractComponent } from '../../../core/abstract.component';
import { EnvironmentService } from '../../../core/services/environment/environment.service';
import { Device } from '../../../core/services/service.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { add } from 'date-fns';
import { EventElement } from '../uva-event-table/uva-event-table.component';
import { SerialCommunication } from '../../../core/services';


@Component({
  selector: 'uva-device-panel',
  templateUrl: './uva-device-panel.component.html',
  styleUrls: ['./uva-device-panel.component.scss']
})

export class UvaDevicePanelComponent extends AbstractComponent implements OnInit, OnDestroy {

  device: Device;
  deviceSubscription: Subscription;
  deviceTypeHumanized: string;
  lampDaysLeft: number;
  filterDaysLeft: number;
  lampReplacementDate: Date;
  filterReplacementDate: Date;
  eventData: EventElement[];
  temperatureData: {
    data: number[],
    labels: string[],
    minValue: number,
    maxValue: number
  } = {
      data: [0],
      labels: ['0'],
      minValue: 0,
      maxValue: 100
    }
  humidityData: {
    data: number[],
    labels: string[],
    minValue: number,
    maxValue: number
  } = {
      data: [0],
      labels: ['0'],
      minValue: 0,
      maxValue: 100
    }
  vocData: {
    data: number[],
    labels: string[],
    minValue: number,
    maxValue: number
  } = {
      data: [0],
      labels: ['0'],
      minValue: 0,
      maxValue: 100
    }
  occupancyData: {
    data: number[],
    labels: string[],
    minValue: number,
    maxValue: number
  } = {
      data: [0],
      labels: ['0'],
      minValue: 0,
      maxValue: 100
    }
  unsubscribe$: Subject<boolean> = new Subject();

  // These should be more that 365 because the device installation date is a random date 365 days in the past.
  readonly LAMP_LIFE_DAYS = 400;
  readonly FILTER_LIFE_DAYS = 500;

  constructor(
    private envService: EnvironmentService,
    private serialCommunication: SerialCommunication
  ) {
    super();
  }

  ngOnInit(): void {
    console.log('UvaDevicePanel INIT');
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
            this.temperatureData.data = [].concat(envData.temperature.data.map(event => event.value))
            this.temperatureData.labels = [].concat(envData.temperature.data.map(event => event.timestamp.toISOString()))
            this.temperatureData.maxValue = envData.temperature.maxValue
            this.temperatureData.minValue = envData.temperature.minValue

            this.humidityData.data = [].concat(envData.humidity.data.map(event => event.value))
            this.humidityData.labels = [].concat(envData.humidity.data.map(event => event.timestamp.toISOString()))
            this.humidityData.maxValue = envData.humidity.maxValue
            this.humidityData.minValue = envData.humidity.minValue

            this.vocData.data = [].concat(envData.voc.data.map(event => event.value))
            this.vocData.labels = [].concat(envData.voc.data.map(event => event.timestamp.toISOString()))
            this.vocData.maxValue = envData.voc.maxValue
            this.vocData.minValue = envData.voc.minValue

            this.occupancyData.data = [].concat(envData.occupancy.data.map(event => event.value))
            this.occupancyData.labels = [].concat(envData.occupancy.data.map(event => event.timestamp.toISOString()))
            this.occupancyData.maxValue = envData.occupancy.maxValue
            this.occupancyData.minValue = envData.occupancy.minValue

            this.eventData = this.device.events?.map((event, idx) => ({
              id: idx,
              Item: event.part,
              Event: event.action,
              Date: event.timestamp
            }));
          });
      }
      this.deviceTypeHumanized = this.humanizeDeviceType();
      const daysSinceInstallation = differenceInCalendarDays(new Date(), d.installationDate);
      this.lampDaysLeft = this.LAMP_LIFE_DAYS - daysSinceInstallation;
      this.filterDaysLeft = this.FILTER_LIFE_DAYS - daysSinceInstallation;
      this.lampReplacementDate = add(d.installationDate, { days: this.LAMP_LIFE_DAYS });
      this.filterReplacementDate = add(d.installationDate, { days: this.FILTER_LIFE_DAYS });
    });

    this.serialCommunication.lastSerialMessage
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        data = data as string;
        console.log("web got data", data);
        if (!data) {
          return;
        }
        const incoming_data_array = data.split(': ');

        if (incoming_data_array.length !== 2) {
          console.log(`recieved unknown datapacket: "${data}`)
          return;
        }

        switch (incoming_data_array[0]) {
          case 'M':
            const newFanSpeed = Number(incoming_data_array[1]);
            if (newFanSpeed >= 0) {
              console.log(`Fan speed set to ${newFanSpeed}`);
            } else {
              console.log(`Invalid Fan Speed "${newFanSpeed}"... did not set!`);
            }
            break;
          case 'DS':
            const doorStatus = incoming_data_array[1];
            if (doorStatus === 'O') {
              this.device.addEvent({
                part: 'Door',
                action: 'Opened',
                timestamp: new Date()
              })
            } else if (doorStatus === 'C') {
              this.device.addEvent({
                part: 'Door',
                action: 'Closed',
                timestamp: new Date()
              })
            } else {
              console.log(`Invalid door status recieved: "${doorStatus}". only 'C', 'O' expected.`);
            }
            break;
          default:
            console.log(`unknown datatype prefix "${incoming_data_array[0]}". expected "M" or "DS".`);
            break;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
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
