import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [RouterLink, TranslateModule]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

}
