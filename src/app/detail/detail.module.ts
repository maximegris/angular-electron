import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Material Design imports
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { NgChartsModule } from 'ng2-charts';
import { UvaAqGraphComponent } from '../shared/components/uva-aq-graph/uva-aq-graph.component';
import { UvaConsumableMonitorComponent } from '../shared/components/uva-consumable-monitor/uva-consumable-monitor.component';
// UVA Components
import { UvaDevicePanelComponent } from '../shared/components/uva-device-panel/uva-device-panel.component';
import { UvaEnviroControlPanelComponent } from '../shared/components/uva-enviro-control-panel/uva-enviro-control-panel.component';
import { UvaEventTable } from '../shared/components/uva-event-table/uva-event-table.component';
import { UvaFloorPanelComponent } from '../shared/components/uva-floor-panel/uva-floor-panel.component';
import { UvaModeToggleComponent } from '../shared/components/uva-mode-toggle/uva-mode-toggle.component';
import { UvaRoomPanelComponent } from '../shared/components/uva-room-panel/uva-room-panel.component';
import { UvaSliderGroupComponent } from '../shared/components/uva-slider-group/uva-slider-group.component';
// import { UvaTotalAqGraphMarkerComponent } from '../shared/components/uva-total-aq-graph/uva-total-aq-graph-marker/uva-total-aq-graph-marker.component';
import { UvaTotalAqGraphCjsComponent } from '../shared/components/uva-total-aq-graph-cjs/uva-total-aq-graph-cjs.component';
import { SharedModule } from '../shared/shared.module';
import { DataViewComponent } from './data-view/data-view.component';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { DynamicTreatmentViewComponent } from './dynamic-treatment-view/dynamic-treatment-view.component';
import { InstallServiceViewComponent } from './install-service-view/install-service-view.component';






@NgModule({
  declarations: [
    DetailComponent, 
    DataViewComponent, 
    DynamicTreatmentViewComponent, 
    InstallServiceViewComponent, 
    UvaEventTable, 
    UvaAqGraphComponent, 
    UvaDevicePanelComponent, 
    UvaEnviroControlPanelComponent, 
    UvaSliderGroupComponent, 
    UvaModeToggleComponent,
    UvaTotalAqGraphCjsComponent,
    UvaRoomPanelComponent,
    UvaFloorPanelComponent,
    UvaConsumableMonitorComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    DetailRoutingModule, 
    MatCardModule, 
    MatProgressBarModule, 
    MatTableModule,
    MatDialogModule,
    NgChartsModule, 
    MatSlideToggleModule,
    MatSliderModule,
    DragDropModule
  ]
})
export class DetailModule {}
