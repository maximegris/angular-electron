import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';

import { DetailComponent } from './detail.component';
import { SharedModule } from '../shared/shared.module';
import { DataViewComponent } from './data-view/data-view.component';
import { DynamicTreatmentViewComponent } from './dynamic-treatment-view/dynamic-treatment-view.component';
import { InstallServiceViewComponent } from './install-service-view/install-service-view.component';
import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { UvaEventTable } from '../shared/components/uva-event-table/uva-event-table.component';
import { UvaAqGraphComponent } from '../shared/components/uva-aq-graph/uva-aq-graph.component';
import { UvaEnviroControlPanelComponent } from '../shared/components/uva-enviro-control-panel/uva-enviro-control-panel.component';
import { UvaSliderGroupComponent } from '../shared/components/uva-slider-group/uva-slider-group.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [DetailComponent, DataViewComponent, DynamicTreatmentViewComponent, InstallServiceViewComponent, UvaEventTable, UvaAqGraphComponent, UvaEnviroControlPanelComponent, UvaSliderGroupComponent],
  imports: [CommonModule, SharedModule, DetailRoutingModule, MatCardModule, MatProgressBarModule, MatTableModule, NgChartsModule, MatSlideToggleModule, MatDialogModule, MatSliderModule]
})
export class DetailModule {}
