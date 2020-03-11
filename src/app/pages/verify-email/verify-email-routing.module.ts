import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './verify-email.component';

const routes: Routes = [
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyEmailRoutingModule {}
