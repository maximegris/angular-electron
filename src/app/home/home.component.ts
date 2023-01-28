import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {

  }

  readExcelFile() {
    this.electronService.readExcelFile();
  }

}
