import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridComponent } from './components/grid/grid.component';
import { OverlayInputComponent } from './components/overlay-input/overlay-input.component';
import { GridCellDirective } from './directives/grid-cell.directive';
import {TextFieldModule} from '@angular/cdk/text-field';
import { GridCellValueComponent } from './components/grid-cell-value/grid-cell-value.component';

@NgModule({
  declarations: [
    GridComponent,
    GridCellDirective,
    OverlayInputComponent,
    GridCellValueComponent,
  ],
  imports: [
    CommonModule,
    CdkTableModule,
    OverlayModule,
    TextFieldModule
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule { }
