import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { Device, FullLocation, RollingEnvironmentalData } from '../service.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  deviceMocks: Record<string, Device> = {};

  private currentLocationSubject = new BehaviorSubject<FullLocation | null>(null);
  public readonly currentLocation$ = this.currentLocationSubject.asObservable();
  private currentDeviceSubject = new BehaviorSubject<Device | null>(null);
  public readonly currentDevice$ = this.currentDeviceSubject.asObservable();
  private $isManualMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isManualMode: Observable<boolean> = this.$isManualMode.asObservable();

  private $environmentalData: BehaviorSubject<RollingEnvironmentalData> = new BehaviorSubject(null)
  public readonly environmentalData: Observable<RollingEnvironmentalData> = this.$environmentalData.asObservable()

  constructor() {
  }

  public generateDeviceMock(id: string, name: string, deviceLocation: FullLocation) {
    if (this.deviceMocks[id]) {
      return this.deviceMocks[id];
    }
    const {events}: Pick<Device, 'events'> = { events: []};
    this.deviceMocks[id] = new Device({
      id: id,
      type: 'AIR20',
      location: deviceLocation,
      // random date some time in the last year
      installationDate: new Date(new Date().getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      name,
      events,
    });
    if (Math.random() > 0.5) {
      events.push({
        part: 'Lamp',
        action: 'Removed',
        timestamp: new Date(2021, 11, 22),
      });
    }
    if (Math.random() > 0.5) {
      events.push({
        part: 'Filter',
        action: 'Detected New',
        timestamp: new Date(2021, 11, 22),
      });
    }
    if (Math.random() > 0.5) {
      events.push({
        part: 'Door',
        action: 'Opened',
        timestamp: new Date(2021, 11, 22),
      });
    }
    if (Math.random() > 0.5) {
      events.push({
        part: 'Filter',
        action: 'Removed',
        timestamp: new Date(2021, 11, 30),
      });
    }

    return this.deviceMocks[id];
  }

  getDevice(id: string) {
    return this.deviceMocks[id];
  }

  getDevicesInLocation(locationId: string) {
    return Object.values(this.deviceMocks)
            .filter(device =>
              device.location.id === locationId ||
              device.location.fullLocationPath.some(location => location.id === locationId));
  }

  setCurrentLocation(loc: FullLocation | null) {
    this.currentLocationSubject.next(loc);
  }

  setCurrentDevice(device: Device | null) {
    this.currentDeviceSubject.next(device);
  }
  
  setManualMode(mode: boolean): void {
    console.log(`deviceService.setManualMode(${mode})`);
    this.$isManualMode.next(mode);
  }

  setMeasurandValue(measurand: string, value: number): void {
    console.log(`SETTING ${measurand} TO VALUE ${value}`)
    let device = this.currentDeviceSubject.value
    let tempEnvironmentData = device.currentEnvironmentData()
    tempEnvironmentData[measurand] = value
    device.setEnvironmentalOverrideData(tempEnvironmentData)
    // let tempEnvironmentData = this.$environmentData.value;
    // tempEnvironmentData[measurand] = value;
    // tempEnvironmentData.airQuality = this.getAirQuality(tempEnvironmentData.total)
    // this.$environmentData.next(tempEnvironmentData);
  }

}
