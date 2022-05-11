import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uva-device-panel',
  templateUrl: './uva-device-panel.component.html',
  styleUrls: ['./uva-device-panel.component.scss']
})
export class UvaDevicePanel implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('UvaDevicePanel INIT');
  }
}
