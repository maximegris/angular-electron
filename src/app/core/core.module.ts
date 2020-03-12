import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'


import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule { }
