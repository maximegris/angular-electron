import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, interval, Subscription } from 'rxjs';
import { EnvironmentService } from '../../../core/services/environment/environment.service';

const installationDate = new Date()
const lifetime = 100000

enum UvaConsumableType {
  FILTER = 'filter',
  LAMP = 'lamp'
}

@Component({
  selector: 'uva-consumable-monitor',
  templateUrl: './uva-consumable-monitor.component.html',
  styleUrls: ['./uva-consumable-monitor.component.scss']
})
export class UvaConsumableMonitorComponent implements OnInit, OnDestroy {
  @Input() type!: UvaConsumableType
  @Input() label!: string
  public remainingLife: number = 100
  private subscription: Subscription

  unsubscribe$: Subject<number> = new Subject()

  // Want to make this a separate service, but for now using EnvironmentService. KR 20220519
  constructor(private consumableService: EnvironmentService) { 
  }

  ngOnInit(): void {
    this.subscription = interval(5000)
      .subscribe(remainingLife => {
        if (remainingLife < 100) {
          this.remainingLife = 100 - remainingLife
        } else {
          this.remainingLife = 0
        }
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
