import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'uva-aq-graph',
  templateUrl: './uva-aq-graph.component.html',
  styleUrls: ['./uva-aq-graph.component.scss']
})
export class UvaAqGraphComponent implements OnInit {
  @Input() measurand: string;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: null,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
  };

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
        ticks: {
          display: false
        }
      },
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
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = UvaAqGraphComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    if (this.lineChartData.labels) {
      this.lineChartData.labels[2] = [ '1st Line', '2nd Line' ];
    }

    this.chart?.update();
  }

  ngOnInit(): void {
    this.lineChartData.datasets[0].label = this.measurand
  }
}
