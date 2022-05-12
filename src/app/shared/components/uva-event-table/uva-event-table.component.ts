import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';


interface EventElement {
  id: number;
  item: string;
  eventType: string;
  date: string; // FIXME: Should be date
}  

@Component({
  selector: 'uva-event-table',
  styleUrls: ['uva-event-table.component.scss'],
  templateUrl: 'uva-event-table.component.html',
})

export class UvaEventTable implements OnInit {
  displayedColumns: string[] = ['item', 'eventType', 'date'];

  EVENT_DATA: EventElement[] = [
    { id: 1, item: 'Lamp', eventType: 'Removed', date: '12/22/2021'},
    { id: 2, item: 'Filter', eventType: 'Detected new', date: '12/22/2021'},
    { id: 3, item: 'Door', eventType: 'Opened', date: '12/30/2021'},
    { id: 4, item: 'Filter', eventType: 'Removed', date: '12/31/2021'},
  ];
  
  dataSource = new MatTableDataSource(this.EVENT_DATA)

  constructor() {}
  ngAfterViewInit() {}
  ngOnInit() {}
}