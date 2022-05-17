import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class EnvironmentService {
    // toggleMode: EventEmitter<boolean> = new EventEmitter<boolean>();
    public isManualMode = new BehaviorSubject<boolean>(false)
    
    setMode(mode: boolean) {
        console.log(`In environmentService.setMode ${mode}`)
        this.isManualMode.next(mode)
    }

    getMode() {
        console.log(`in environmentService.getMode ${this.isManualMode}`)
        return this.isManualMode;
    }
}