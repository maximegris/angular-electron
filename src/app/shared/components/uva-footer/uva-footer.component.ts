import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uva-footer',
  templateUrl: './uva-footer.component.html',
  styleUrls: ['./uva-footer.component.scss']
})
export class UvaFooterComponent implements OnInit {
  year: number

  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear()
  }

}
