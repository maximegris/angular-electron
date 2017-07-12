import { Component, OnInit } from '@angular/core';

import { RealtimeFreelancersService } from './freelancer-grid/freelancer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RealtimeFreelancersService]
})
export class HomeComponent implements OnInit {
  title = `App works !`;

  constructor(private realtimeFreelancersService: RealtimeFreelancersService) { }

  ngOnInit() {
    this.realtimeFreelancersService.run();
  }

}
