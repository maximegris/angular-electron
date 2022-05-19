import { Component, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subject, takeUntil } from 'rxjs';
import { EnvironmentData, EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-aq-graph',
  templateUrl: './uva-aq-graph.component.html',
  styleUrls: [ './uva-aq-graph.component.scss' ]
})

export class UvaAqGraphComponent implements OnInit, OnDestroy {
  @Input() measurand!: string;
  @Input() label!: string;
  public environmentData: EnvironmentData;
  unsubscribe$: Subject<EnvironmentData> = new Subject();


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40, 34, 54, 33 ],
        label: null,
        borderColor: '#708BB5',
        borderWidth: 1,
        pointRadius: 1,
      },
    ],
    labels: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
  };

  constructor(private environmentService: EnvironmentService) { 
    environmentService.environmentData[this.measurand] = this.lineChartData.datasets[0].data;
  }


  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: { display: false },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = UvaAqGraphComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  ngOnInit(): void {
    this.environmentService.environmentData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(environmentData => {
        this.environmentData = environmentData;
        this.lineChartData.datasets[0].data.shift();
        this.lineChartData.datasets[0].data.push(environmentData[this.measurand]);
        this.chart?.update();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(this.environmentData);
    this.unsubscribe$.complete();
  }

}