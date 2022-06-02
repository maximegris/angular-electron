import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DeviceService } from '../../../core/services/device/device.service';

@Component({
  selector: 'uva-enviro-control-panel',
  templateUrl: './uva-enviro-control-panel.component.html',
  styleUrls: ['./uva-enviro-control-panel.component.scss']
})
export class UvaEnviroControlPanelComponent implements OnInit, OnDestroy {
  @Input() initTemperature: number
  @Input() initHumidity: number
  @Input() initVoc: number
  @Input() initOccupancy: number

  public isManualMode: boolean = false;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceService.isManualMode
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isManualMode => {
        this.isManualMode = isManualMode
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  closePanel(event: PointerEvent): void {
    console.log(`closePanel this.isManualMode ${this.isManualMode}`)
    this.deviceService.setManualMode(false)
  }

}
