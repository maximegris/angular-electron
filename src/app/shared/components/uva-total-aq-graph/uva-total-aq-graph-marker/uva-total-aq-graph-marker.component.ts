import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'uva-total-aq-graph-marker',
  templateUrl: './uva-total-aq-graph-marker.component.html',
  styleUrls: ['./uva-total-aq-graph-marker.component.scss']
})

export class UvaTotalAqGraphMarkerComponent implements OnInit {
  @Input() totalAq: number;
  graphHeight: number = 192;

  constructor() { }

  ngOnInit(): void {

  }

}
