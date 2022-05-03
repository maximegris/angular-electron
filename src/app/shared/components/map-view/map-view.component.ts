import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  @Input() view: string;

  constructor() { }

  ngOnInit(): void {
    console.log('MAP INIT', this.view);
  }

  getBackgroundImage() {
    switch (this.view) {
      case 'room':
        return './../../../../assets/room.png';
        break;
      case 'floor':
      default:
        return './../../../../assets/floor.png';
        break;
    }
  }

}
