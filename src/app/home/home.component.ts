import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services/electron/electron.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private electron: ElectronService) { }

  ngOnInit(): void { }

  createStealthMobileBrowserWindow() {
    let b = this.electron.createStealthMobileBrowserWindow();
    b['start']();
  };

}
