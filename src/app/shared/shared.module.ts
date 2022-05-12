import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent, MapViewComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { GeoJsonMapComponent } from './components/geojson-map/geojson-map.component';
import { MapLevelControlComponent } from './components/map-level-control/map-level-control.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    MapViewComponent,
    WebviewDirective,
    GeoJsonMapComponent,
    MapLevelControlComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NgxMapboxGLModule.withConfig({
      // TODO: Stefan's personal public token. Replace with UV Angel's token.
      accessToken: 'pk.eyJ1IjoicmFkYWNvdnNreSIsImEiOiJjbDIzN3FqNXIwbTZvM2NtbXhuMHFqcHkxIn0.fihN0nlSbjGCvaveBuIVmA',
    })
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    MapViewComponent,
    GeoJsonMapComponent
  ]
})
export class SharedModule {}
