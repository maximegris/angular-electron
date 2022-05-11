import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-treatment-view',
  templateUrl: './dynamic-treatment-view.component.html',
  styleUrls: ['./dynamic-treatment-view.component.scss'],
})

export class DynamicTreatmentViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export interface DeviceEvent {
  item: string,
  eventType: string,
  date: string
}

const EVENT_DATA: DeviceEvent[] =
  [
    { item: 'Lamp', eventType: 'Removed', date: '12-22-2021' },
    { item: 'Filter', eventType: 'Detected new', date: '12-22-2021' },
    { item: 'Door', eventType: 'Opened', date: '12-22-2021' },
    { item: 'Filter', eventType: 'Detected new', date: '12-22-2021' },
  ];

export class EventTable {
  displayedColumns: string[] = ['item', 'eventType', 'date'];
  dataSource = EVENT_DATA;
}