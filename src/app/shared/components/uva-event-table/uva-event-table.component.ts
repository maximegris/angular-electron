import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';


export interface EventElement {
  id: number;
  Item: string;
  Event: string;
  Date: Date;
}  

@Component({
  selector: 'uva-event-table',
  styleUrls: ['uva-event-table.component.scss'],
  templateUrl: 'uva-event-table.component.html',
})

export class UvaEventTable implements OnInit {
  displayedColumns: string[] = ['Item', 'Event', 'Date'];

  @Input()
  set eventData(data: EventElement[]) {
    this.dataSource = new MatTableDataSource(data);
  }
  
  dataSource: MatTableDataSource<EventElement>;

  constructor() {}

  ngOnInit() { }
}