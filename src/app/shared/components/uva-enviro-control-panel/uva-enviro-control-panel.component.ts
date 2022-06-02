import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Device } from '../../../core/services/service.model';
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
  @Input() deviceId: string

  private device: Device
  public isManualMode: boolean = false;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    // console.log("[ENV CONRTOL PANEL] - INPUT DeviceID", this.deviceId)
    this.device = this.deviceService.getDevice(this.deviceId);
    // console.log("[ENV CONRTOL PANEL] - THIS.DEVICE.ID", this.device.id)
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

  // onSliderChange(measurand: string) {
  //   console.log("slider changed!!!!")
  //   this.deviceService.setMeasurandValue('temperature', this.initTemperature)
  //   this.deviceService.setMeasurandValue('humidity', this.initHumidity)
  //   this.deviceService.setMeasurandValue('voc', this.initVoc)
  //   this.deviceService.setMeasurandValue('occupancy', this.initOccupancy)
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("[ENV CONRTOL PANEL] - INPUT DeviceID ON CHANGE", this.deviceId)
  //   this.deviceService.isManualMode
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe(isManualMode => {
  //       this.isManualMode = isManualMode
  //     });
  // }



  closePanel(event: PointerEvent): void {
    console.log(`closePanel this.isManualMode ${this.isManualMode}`)
    this.deviceService.setManualMode(false)
  }

}
