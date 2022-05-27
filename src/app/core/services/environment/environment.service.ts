import { Injectable } from '@angular/core';
import { BADFAMILY } from 'dns';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Device, FullLocation } from '../service.model';

const installationDate = new Date()

enum AirQuality {
  BAD = 'bad',
  MEDIUM = 'medium',
  GOOD = 'good',
}

export type EnvironmentData = {
  temperature: number,
  humidity: number,
  voc: number,
  occupancy: number,
  total: number,
  airQuality: AirQuality,
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
      airQuality: AirQuality.GOOD,
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

  constructor() {}

  setManualMode(mode: boolean): void {
    console.log(`environmentService.setManualMode(${mode})`);
    this.$isManualMode.next(mode);
  }

  setMeasurandValue(measurand: string, value: number): void {
    let tempEnvironmentData = this.$environmentData.value;
    tempEnvironmentData[measurand] = value;
    tempEnvironmentData.airQuality = this.getAirQuality(tempEnvironmentData.total)
    this.$environmentData.next(tempEnvironmentData);
  }

  setCurrentLocation(loc: FullLocation | null) {
    this.currentLocationSubject.next(loc);
  }

  setCurrentDevice(device: Device | null) {
    this.currentDeviceSubject.next(device);
  }

  getAirQuality(total: number): AirQuality {
    let airQuality: AirQuality
    if (total < 33) {
      airQuality = AirQuality.BAD
    } else if (total < 66) {
      airQuality = AirQuality.MEDIUM
    } else {
      airQuality = AirQuality.GOOD
    }
    return airQuality    
  }

}