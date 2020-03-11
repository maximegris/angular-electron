import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatButtonToggleModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule { }
