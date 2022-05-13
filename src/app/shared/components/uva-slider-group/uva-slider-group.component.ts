import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uva-slider-group',
  templateUrl: './uva-slider-group.component.html',
  styleUrls: ['./uva-slider-group.component.scss']
})
export class UvaSliderGroupComponent implements OnInit {
  @Input() measurand!: string
  @Input() min!: string
  @Input() max: string
  @Input() step: string
  @Input() value: string

  constructor() { }

  ngOnInit(): void {
  }

}
