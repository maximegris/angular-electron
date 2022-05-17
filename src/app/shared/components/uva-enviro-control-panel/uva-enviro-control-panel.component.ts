import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnvironmentService } from '../../../core/services/environment/environment.service';
import { Observer } from 'rxjs';
@Component({
  selector: 'uva-enviro-control-panel',
  templateUrl: './uva-enviro-control-panel.component.html',
  providers: [EnvironmentService]
})
export class UvaEnviroControlPanelComponent implements OnInit {
  public isManualMode: boolean = false;
  public environmentSubscription: Subscription;

  constructor(private environmentService: EnvironmentService) { }

  modeObserver: Observer<boolean> = {
    next: (mode: boolean) => console.log(mode),
    error: (err) => console.log(err),
    complete: () => console.log('complete')
  }

  ngOnInit(): void {
    this.environmentService.getManualMode().subscribe(response => {
      console.log(response)
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
