import { Component, OnInit } from '@angular/core';
import { differenceInMinutes } from 'date-fns';
import { map, Subscription, takeUntil, tap } from 'rxjs';
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
  totalData: {
    data: number[]
  } = {
      data: [0]
    }

  firstDeviceSubscription: Subscription;

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
      if (this.devices && this.devices.length > 0) {
        const firstDevice = this.devices[0]
        // for a location, since the data is so influenced by the location itself,
        // just take first first device's info as the 'average'. lazy, but works for demos!
        this.firstDeviceSubscription?.unsubscribe();
        this.firstDeviceSubscription = firstDevice.environmentalData
          .pipe(takeUntil(this.destroyed$))
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
            this.totalData = {
              data: [envData.total.data[envData.total.data.length - 1].value],
            }
          });
      }
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
