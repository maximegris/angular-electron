import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subject, takeUntil } from 'rxjs';
import { EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-slider-group',
  templateUrl: './uva-slider-group.component.html',
  styleUrls: ['./uva-slider-group.component.scss']
})
export class UvaSliderGroupComponent implements OnInit {
  @Input() measurand!: string
  @Input() min!: string
  @Input() max!: string
  @Input() step!: string
  @Input() value!: number
  @Input() label: string

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
  }

  onInputChange(event: MatSliderChange): void {
    this.environmentService.setMeasurandValue(this.measurand, event.value)
  }

}
