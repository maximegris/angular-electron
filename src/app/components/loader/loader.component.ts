import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DownloadService } from '../../services/download.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  percentage: any = '0%'
  constructor(private download: DownloadService) {
    this.download.progressLoading.subscribe(
      (res) => this.percentage = res.percentage
    )
  }

  ngOnInit() {

  }

}
