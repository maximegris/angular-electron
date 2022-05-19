import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Device, FullLocation } from '../service.model';

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
  private $environmentData: BehaviorSubject<EnvironmentData> = new BehaviorSubject(
    {
      temperature: 50,
      humidity: 50,
      voc: 50,
      occupancy: 50,
      total: 50,
    }
  )

  private currentLocationSubject = new ReplaySubject<FullLocation | null>(1);
  private currentDeviceSubject = new ReplaySubject<Device | null>(1);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly isManualMode: Observable<boolean> = this.$isManualMode.asObservable();
  public readonly environmentData: Observable<EnvironmentData> = this.$environmentData.asObservable();
  public readonly currentLocation$ = this.currentLocationSubject.asObservable();
  public readonly currentDevice$ = this.currentDeviceSubject.asObservable();

  constructor() {
    // setInterval(() => {
    //   this.setManualMode(!this.$isManualMode.value)
    // }, 5000);
  }

  setManualMode(mode: boolean): void {
    console.log(`environmentService.setManualMode(${mode})`);
    this.$isManualMode.next(mode);
  }

  setMeasurandValue(measurand: string, value: number): void {
    let tempEnvironmentData = this.$environmentData.value;
    tempEnvironmentData[measurand] = value;
    tempEnvironmentData.total = this.calculateTotalAq(tempEnvironmentData)
    console.log(tempEnvironmentData)
    this.$environmentData.next(tempEnvironmentData);

  }

  calculateTotalAq(environmentData: EnvironmentData): number {
    return ((environmentData.temperature + environmentData.humidity + environmentData.voc + environmentData.occupancy) / 400) * 100;
  }
  
  setCurrentLocation(loc: FullLocation | null) {
    this.currentLocationSubject.next(loc);
  }

  setCurrentDevice(device: Device | null) {
    this.currentDeviceSubject.next(device);
  }

}