import {Component} from '@angular/core';

export interface EventElement {
  item: string;
  eventType: string;
  date: string; // FIXME: Should be date
}

const EVENT_DATA: EventElement[] = [
  { item: 'Lamp', eventType: 'Removed', date: '12/22/2021'},
  { item: 'Filter', eventType: 'Detected new', date: '12/22/2021'},
  { item: 'Door', eventType: 'Opened', date: '12/30/2021'},
  { item: 'Filter', eventType: 'Removed', date: '12/31/2021'},
];

@Component({
  selector: 'uva-event-table',
  styleUrls: ['uva-event-table.component.scss'],
  templateUrl: 'uva-event-table.component.html',
})

export class UvaEventTable {
  displayedColumns: string[] = ['item', 'eventType', 'date'];
  dataSource = EVENT_DATA;
}