import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subject, takeUntil } from 'rxjs';
import { EnvironmentData, EnvironmentService } from '../../../core/services/environment/environment.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'uva-total-aq-graph-cjs',
  templateUrl: './uva-total-aq-graph-cjs.component.html',
  styleUrls: ['./uva-total-aq-graph-cjs.component.scss']
})
export class UvaTotalAqGraphCjsComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public totalAq: number;
  public environmentData: EnvironmentData;
  public canvas: HTMLCanvasElement;
  unsubscribe$: Subject<EnvironmentData> = new Subject();

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        display: false
      },
      y: {
        display: false,
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['TotalAQ'],
    datasets: [
      { data: [10], backgroundColor: '#1b427f' },
    ]
  };

  constructor(private environmentService: EnvironmentService) {};

  ngOnInit(): void {
    this.environmentService.environmentData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(environmentData => {
        this.totalAq = environmentData.total
        this.barChartData.datasets[0].data = [Math.round(this.totalAq)]
        this.chart?.update()
      });
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }


}