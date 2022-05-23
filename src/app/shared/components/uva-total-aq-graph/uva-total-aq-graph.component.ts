import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EnvironmentData, EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-total-aq-graph',
  templateUrl: './uva-total-aq-graph.component.html',
  styleUrls: ['./uva-total-aq-graph.component.scss']
})
export class UvaTotalAqGraphComponent implements OnInit {
  public totalAq: number;
  public environmentData: EnvironmentData;
  unsubscribe$: Subject<EnvironmentData> = new Subject();

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.environmentService.environmentData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(environmentData => {
        this.totalAq = environmentData.total
      });
  }
}
