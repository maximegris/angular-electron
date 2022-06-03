import { Injectable } from '@angular/core'
import { ReplaySubject, BehaviorSubject, Observable, timer } from 'rxjs'
import { Device, Location, FullLocation, RollingEnvironmentalData } from '../service.model'

// how often we mock location environment data
const LOCATION_ENVIRONMENT_MOCK_INTERVAL_MS = 45000

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

  mockedLocations: Location[] = [];
  private locationEnvUpdatedSubject = new ReplaySubject<Location[]>(1);
  public readonly locationEnvUpdated$ = this.locationEnvUpdatedSubject.asObservable();

  constructor() {
    timer(0, LOCATION_ENVIRONMENT_MOCK_INTERVAL_MS).subscribe(() => this.mockLocationEnvironmentData());
    timer(0, 1000).subscribe(() => this.computeLocationAQ());
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

  computeLocationAQ(): void {
    this.mockedLocations.forEach(location => {
      location.calculateUvaAirQuality(this.getDevicesInLocation(location.id))
    })
  }

  mockLocationEnvironmentData(): void {
    this.mockedLocations.forEach(location => {
      location.randomizeLocationAirQuality();
      location.randomizeUVCTerminalCleaning();
      location.randomizeHandwashingCompliance();
      location.calculateUvaAirQuality(this.getDevicesInLocation(location.id))
    });
    this.locationEnvUpdatedSubject.next([...this.mockedLocations]);
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
  }

  registerLocationForEnvironmentMocking(location: Location) {
    if (location && !this.mockedLocations.find(loc => loc.id === location.id)) {
      this.mockedLocations.push(location);
    }
  }

  unregisterLocationForEnvironmentMocking(location: Location) {
    if (location) {
      const idx = this.mockedLocations.findIndex(loc => loc.id === location.id);
      if (idx >= 0) {
        this.mockedLocations.splice(idx, 1);
      }
    }
  }

  unregisterAllLocationsForEnvironmentMocking() {
    this.mockedLocations = [];
  }

}
