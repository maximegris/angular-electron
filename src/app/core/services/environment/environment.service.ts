import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Device, FullLocation } from '../service.model';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private $isManualMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private currentLocationSubject = new ReplaySubject<FullLocation | null>(1);
  private currentDeviceSubject = new ReplaySubject<Device | null>(1);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly isManualMode: Observable<boolean> = this.$isManualMode.asObservable();
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

  setCurrentLocation(loc: FullLocation | null) {
    this.currentLocationSubject.next(loc);
  }

  setCurrentDevice(device: Device | null) {
    this.currentDeviceSubject.next(device);
  }

}