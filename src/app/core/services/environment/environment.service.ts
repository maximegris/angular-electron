import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, ReplaySubject, timer } from 'rxjs';
import { Device, FullLocation, Location } from '../service.model';

// how often we mock location environment data
const LOCATION_ENVIRONMENT_MOCK_INTERVAL_MS = 45000;

export type EnvironmentData = {
  temperature: number,
  humidity: number,
  voc: number,
  occupancy: number,
  total: number,
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private $isManualMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isManualMode: Observable<boolean> = this.$isManualMode.asObservable();

  private $environmentData: BehaviorSubject<EnvironmentData> = new BehaviorSubject(
    {
      temperature: 50,
      humidity: 50,
      voc: 50,
      occupancy: 50,
      total: 50,
    }
  )
  public readonly environmentData: Observable<EnvironmentData> = this.$environmentData.asObservable();

  private $lampLife: BehaviorSubject<number> = new BehaviorSubject(100);
  public readonly lampLife: Observable<number> = this.$lampLife.asObservable();

  private $filterLife: BehaviorSubject<number> = new BehaviorSubject(100);
  public readonly filterLife: Observable<number> = this.$filterLife.asObservable();

  private currentLocationSubject = new ReplaySubject<FullLocation | null>(1);
  private currentDeviceSubject = new ReplaySubject<Device | null>(1);

  public readonly currentLocation$ = this.currentLocationSubject.asObservable();
  public readonly currentDevice$ = this.currentDeviceSubject.asObservable();

  mockedLocations: Location[] = [];
  private locationEnvUpdatedSubject = new ReplaySubject<Location[]>(1);
  public readonly locationEnvUpdated$ = this.locationEnvUpdatedSubject.asObservable();

  constructor() {
    timer(0, LOCATION_ENVIRONMENT_MOCK_INTERVAL_MS).subscribe(() => this.mockLocationEnvironmentData());
  }

  mockLocationEnvironmentData(): void {
    this.mockedLocations.forEach(location => {
      location.randomizeLocationAirQuality();
      location.randomizeUVCTerminalCleaning();
      location.randomizeHandwashingCompliance();
    });
    this.locationEnvUpdatedSubject.next([...this.mockedLocations]);
  }

  setManualMode(mode: boolean): void {
    console.log(`environmentService.setManualMode(${mode})`);
    this.$isManualMode.next(mode);
  }

  setMeasurandValue(measurand: string, value: number): void {
    let tempEnvironmentData = this.$environmentData.value;
    tempEnvironmentData[measurand] = value;
    this.$environmentData.next(tempEnvironmentData);
  }

  setCurrentLocation(loc: FullLocation | null) {
    this.currentLocationSubject.next(loc);
  }

  setCurrentDevice(device: Device | null) {
    this.currentDeviceSubject.next(device);
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