import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EnvironmentData, EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-enviro-control-panel',
  templateUrl: './uva-enviro-control-panel.component.html',
  styleUrls: ['./uva-enviro-control-panel.component.scss']
})
export class UvaEnviroControlPanelComponent implements OnInit, OnDestroy {
  public isManualMode: boolean = false;
  public environmentData: EnvironmentData;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.environmentService.isManualMode
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isManualMode => {
        this.isManualMode = isManualMode
      });
    this.environmentService.environmentData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(environmentData => {
        this.environmentData = environmentData
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  closePanel(event: PointerEvent): void {
    console.log(`closePanel this.isManualMode ${this.isManualMode}`)
    this.environmentService.setManualMode(false)
  }

}
