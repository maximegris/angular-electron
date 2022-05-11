import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';

import { DetailComponent } from './detail.component';
import { SharedModule } from '../shared/shared.module';
import { DataViewComponent } from './data-view/data-view.component';
import { DynamicTreatmentViewComponent } from './dynamic-treatment-view/dynamic-treatment-view.component';
import { InstallServiceViewComponent } from './install-service-view/install-service-view.component';
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [DetailComponent, DataViewComponent, DynamicTreatmentViewComponent, InstallServiceViewComponent],
  imports: [CommonModule, SharedModule, DetailRoutingModule, MatCardModule]
})
export class DetailModule {}
