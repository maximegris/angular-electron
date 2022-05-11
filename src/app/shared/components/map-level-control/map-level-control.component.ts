import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractComponent } from '../../../core/abstract.component';
import { LevelFeature } from '../geojson-map/imdf.types';

// TODO: make scrollable controll that shows up/down arrows and only 3 levels if there are more than 5 levels

@Component({
  selector: 'uvc-map-level-control',
  templateUrl: './map-level-control.component.html',
  styleUrls: ['./map-level-control.component.scss']
})
export class MapLevelControlComponent extends AbstractComponent {

  @Input()
  levels: LevelFeature<any>[] = [];

  @Input()
  selectedLevel: LevelFeature<any>;

  @Input()
  showLevelName = false;

  @Output()
  selectLevel = new EventEmitter<LevelFeature<any>>();

  constructor() {
    super();
  }

  onSelectLevel(level: LevelFeature<any>) {
    this.selectLevel.emit(level);
  }

}
