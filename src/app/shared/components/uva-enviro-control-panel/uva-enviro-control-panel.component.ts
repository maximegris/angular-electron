import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-enviro-control-panel',
  templateUrl: './uva-enviro-control-panel.component.html',
  providers: [EnvironmentService]
})
export class UvaEnviroControlPanelComponent implements OnInit {
  public isManualMode: boolean = false;
  public environmentSubscription: Subscription;

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.environmentSubscription = this.environmentService.getManualMode()
      .subscribe(response => {
      })
  }

  closePanel(event: PointerEvent): void {
    console.log(`closePanel this.isManualMode ${this.isManualMode}`)
    this.environmentService.setManualMode(false)
  }

  // logPanelDetails(): void {
  //   console.log(`in EnvironmentControlPanel this.isManualMode = ${this.isManualMode}`)
  // }

}
