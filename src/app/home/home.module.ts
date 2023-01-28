import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, MatIconModule]
})
export class HomeModule { }
