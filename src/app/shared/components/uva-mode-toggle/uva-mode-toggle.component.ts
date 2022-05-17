import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-mode-toggle',
  templateUrl: './uva-mode-toggle.component.html',
  styleUrls: ['./uva-mode-toggle.component.scss'],
  providers: [EnvironmentService],
})
export class UvaModeToggleComponent implements OnInit {

  isManualMode: boolean = false;

  constructor(private environmentService: EnvironmentService) { 
  }

  ngOnInit(): void {

  }

  toggleMode(event: MatSlideToggleChange) {
    this.environmentService.setMode(event.checked)
  }

}
