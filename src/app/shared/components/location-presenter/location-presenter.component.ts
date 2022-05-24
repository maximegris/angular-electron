import { Component, Input, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../core/abstract.component';
import { FullLocation } from '../../../core/services/service.model';

@Component({
  selector: 'app-location-presenter',
  templateUrl: './location-presenter.component.html',
  styleUrls: ['./location-presenter.component.scss']
})
export class LocationPresenterComponent extends AbstractComponent implements OnInit {

  @Input()
  location: FullLocation;

  @Input()
  title = 'Location';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
