import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Device, FullLocation } from '../service.model';

const installationDate = new Date()

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
    this.$environmentData.next(tempEnvironmentData);
  }

  getRemainingLampLife(installationDate: Date, lifespan: number): void {
    const now = new Date().getTime()
    const expiration = now + lifespan
    this.$lampLife.next(this.getRemainingLife(installationDate, lifespan))
  }

  getRemainingFilterLife(installationDate: Date, lifespan: number): void {
    const remainingLife = this.getRemainingLife(installationDate, 100000)
    this.$filterLife.next(remainingLife);
  }

  private getRemainingLife(installationDate: Date, lifespan: number): number {
    const now = new Date().getTime()
    const consumed = now - installationDate.getTime()
    const remainingLife = (consumed / lifespan) * 100
    return remainingLife
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