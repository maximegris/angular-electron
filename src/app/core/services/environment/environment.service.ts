import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EnvironmentService {
  public isManualMode = new Subject<boolean>();

  constructor() { }

  setManualMode(mode: boolean): void {
   console.log(`environmentService.setManualMode(${mode})`);
   this.isManualMode.next(mode);
  }

  getManualMode(): Subject<boolean> {
    console.log(`environmentService.getManualMode(${this.isManualMode})`);
    return this.isManualMode;
  }
}