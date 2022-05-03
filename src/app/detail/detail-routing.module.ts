import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';
import { DataViewComponent } from './data-view/data-view.component';
import { DynamicTreatmentViewComponent } from './dynamic-treatment-view/dynamic-treatment-view.component';
import { InstallServiceViewComponent } from './install-service-view/install-service-view.component';

const routes: Routes = [
  {
    path: 'detail',
    component: DetailComponent
  },
  {
    path: 'data',
    component: DataViewComponent
  },
  {
    path: 'dynamic',
    component: DynamicTreatmentViewComponent
  },
  {
    path: 'service',
    component: InstallServiceViewComponent
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule {}
