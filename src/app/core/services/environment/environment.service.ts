import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private $isManualMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly isManualMode: Observable<boolean> = this.$isManualMode.asObservable();

  constructor() {
    // setInterval(() => {
    //   this.setManualMode(!this.$isManualMode.value)
    // }, 5000);
  }

  setManualMode(mode: boolean): void {
    console.log(`environmentService.setManualMode(${mode})`);
    this.$isManualMode.next(mode);
  }
}