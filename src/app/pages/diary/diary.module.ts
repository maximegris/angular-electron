import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';

import { DiaryComponent } from './diary.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [DiaryComponent],
    imports: [CommonModule, SharedModule, DiaryRoutingModule]
})
export class DiaryModule { }
