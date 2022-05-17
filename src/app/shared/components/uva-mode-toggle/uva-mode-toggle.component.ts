import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subject, takeUntil } from 'rxjs';
import { EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-mode-toggle',
  templateUrl: './uva-mode-toggle.component.html',
  styleUrls: ['./uva-mode-toggle.component.scss']
})
export class UvaModeToggleComponent implements OnInit, OnDestroy {
  public isManualMode: boolean = false;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.environmentService.isManualMode
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isManualMode => {
        console.log("uva-mode-toggle.component - isManualMode updated", isManualMode);
        this.isManualMode = isManualMode
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  toggle(event: MatSlideToggleChange) {
    this.environmentService.setManualMode(event.checked)
  }

}
