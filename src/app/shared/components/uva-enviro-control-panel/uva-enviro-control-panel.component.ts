import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { EnvironmentService } from '../../../core/services/environment/environment.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'uva-enviro-control-panel',
  templateUrl: './uva-enviro-control-panel.component.html',
  providers: [EnvironmentService]
})

export class UvaEnviroControlPanelComponent implements OnInit, OnDestroy {
  public isManualMode: boolean = false;
  public environmentSubscription: Subscription;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private environmentService: EnvironmentService) { }

  modeObserver: Observer<boolean> = {
    next: (mode: boolean) => console.log(mode),
    error: (err) => console.log(err),
    complete: () => console.log('complete')
  }

  ngOnInit(): void {
    this.environmentService.isManualMode
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
    this.environmentService.setManualMode(false)
  }

  logPanelDetails(): void {
    console.log(`in EnvironmentControlPanel this.isManualMode = ${this.isManualMode}`)
  }

}
