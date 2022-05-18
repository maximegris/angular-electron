import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export type EnvironmentData = {
  temperature: number,
  humidity: number,
  voc: number,
  occupancy: number,
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
    }
  )
  

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly isManualMode: Observable<boolean> = this.$isManualMode.asObservable();
  public readonly environmentData: Observable<EnvironmentData> = this.$environmentData.asObservable();

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
    this.$environmentData[measurand] = value;
    console.log(`environmentService.setMeasurandValue ${measurand} ${value}`)
  }
}