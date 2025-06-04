import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    standalone: true,
    imports: [RouterLink, TranslateModule]
})
export class DetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('DetailComponent INIT');
   }

}
