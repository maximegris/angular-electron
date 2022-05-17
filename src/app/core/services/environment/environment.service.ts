import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EnvironmentService {
  public isManualMode = new BehaviorSubject<boolean>(false)

  constructor() { }

  setManualMode(mode: boolean): void {
   console.log(`environmentService.setManualMode(${mode})`);
   this.isManualMode.next(mode);
  }
  
  getManualMode(): BehaviorSubject<boolean> {
    console.log(`environmentService.getManualMode(${this.isManualMode})`);
    return this.isManualMode;
  }
}