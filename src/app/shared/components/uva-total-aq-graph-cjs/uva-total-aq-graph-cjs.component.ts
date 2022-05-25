import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'uva-total-aq-graph-cjs',
  templateUrl: './uva-total-aq-graph-cjs.component.html',
  styleUrls: ['./uva-total-aq-graph-cjs.component.scss']
})
export class UvaTotalAqGraphCjsComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() data!: number[]

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
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['TotalAQ'],
    datasets: [
      { data: [50], backgroundColor: '#1b427f' },
    ]
  };

  constructor() {}

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.barChartData.datasets[0].data = this.data;
    this.chart?.update()
  }

}
