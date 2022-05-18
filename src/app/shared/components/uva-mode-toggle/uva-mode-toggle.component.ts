import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subject, takeUntil } from 'rxjs';
import { EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-mode-toggle',
  templateUrl: './uva-mode-toggle.component.html',
  styleUrls: ['./uva-mode-toggle.component.scss']
})

export class UvaModeToggleComponent implements OnInit, OnDestroy {
  public isManualMode: boolean = true;
  unsubscribe$: Subject<boolean> = new Subject();

  @ViewChild('uvaEnviroSliderToggle')
  public uvaEnviroSliderToggle!: MatSlideToggle;

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.environmentService.isManualMode
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isManualMode => {
        this.isManualMode = isManualMode;
        // Unclear why this is not defined on init. But it isn't. KR 20220518
        if (this.uvaEnviroSliderToggle) {
          this.uvaEnviroSliderToggle.checked = isManualMode
        }
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
