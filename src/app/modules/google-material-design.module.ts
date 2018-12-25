import {NgModule} from '@angular/core';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatBadgeModule,      MatButtonModule,  MatCardModule,       MatCheckboxModule,
  MatChipsModule,      MatDialogModule,  MatDividerModule,    MatExpansionModule,
  MatGridListModule,   MatIconModule,    MatInputModule,      MatListModule,
  MatMenuModule,       MatRadioModule,   MatRippleModule,     MatSelectModule,
  MatSidenavModule,    MatSliderModule,  MatSnackBarModule,
  MatSortModule,       MatStepperModule, MatTableModule,      MatTabsModule,
  MatToolbarModule,    MatTooltipModule, MatTreeModule, MatSlideToggleModule,
  MatAutocompleteModule,    MatButtonToggleModule, MatDatepickerModule, MatBottomSheetModule,
  MatProgressSpinnerModule, MatProgressBarModule,  MatNativeDateModule, MatPaginatorModule
} from '@angular/material';

@NgModule({
  exports: [
    CdkTableModule,   CdkTreeModule,    DragDropModule,

    MatBadgeModule,   MatBottomSheetModule,    MatButtonModule,    MatButtonToggleModule,
    MatCardModule,    MatCheckboxModule,    MatChipsModule,    MatStepperModule,
    MatDividerModule, MatExpansionModule,    MatInputModule,    MatListModule,
    MatMenuModule,    MatNativeDateModule,    MatRadioModule,    MatRippleModule,
    MatSelectModule,  MatSidenavModule,    MatSliderModule,    MatSlideToggleModule,
    MatTableModule,   MatTabsModule,    MatToolbarModule,    MatTooltipModule,
    MatDialogModule,  MatTreeModule,
    MatSnackBarModule,    MatSortModule,    MatGridListModule,    MatIconModule,
    MatProgressSpinnerModule, MatDatepickerModule,    MatPaginatorModule, MatProgressBarModule,
    MatAutocompleteModule,

    ScrollingModule,
    BrowserAnimationsModule
  ]
})
export class GoogleMaterialDesignModule {}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */