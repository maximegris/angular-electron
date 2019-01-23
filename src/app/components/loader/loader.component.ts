import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  percentage: any = '0%'
  constructor(public api: ApiService) {
    this.api.progressLoading.subscribe(
      (res) => this.percentage = res
      // (res) => console.log(res)
    )
  }

  ngOnInit() {

  }

}
