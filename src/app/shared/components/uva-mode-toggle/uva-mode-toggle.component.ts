import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-mode-toggle',
  templateUrl: './uva-mode-toggle.component.html',
  providers: [EnvironmentService]
})
export class UvaModeToggleComponent implements OnInit {
  public isManualMode: boolean = false;

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
  }

  toggle(event: MatSlideToggleChange) {
    this.environmentService.setManualMode(event.checked)
  }

}
