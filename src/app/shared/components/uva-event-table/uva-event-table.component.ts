import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';


interface EventElement {
  id: number;
  Item: string;
  Event: string;
  Date: string; // FIXME: Should be date
}  

@Component({
  selector: 'uva-event-table',
  styleUrls: ['uva-event-table.component.scss'],
  templateUrl: 'uva-event-table.component.html',
})

export class UvaEventTable implements OnInit {
  displayedColumns: string[] = ['Item', 'Event', 'Date'];

  EVENT_DATA: EventElement[] = [
    { id: 1, Item: 'Lamp', Event: 'Removed', Date: '12/22/2021'},
    { id: 2, Item: 'Filter', Event: 'Detected new', Date: '12/22/2021'},
    { id: 3, Item: 'Door', Event: 'Opened', Date: '12/30/2021'},
    { id: 4, Item: 'Filter', Event: 'Removed', Date: '12/31/2021'},
  ];
  
  dataSource = new MatTableDataSource(this.EVENT_DATA)

  constructor() {}
  ngAfterViewInit() {}
  ngOnInit() {}
}