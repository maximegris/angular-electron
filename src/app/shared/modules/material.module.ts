import { NgModule } from '@angular/core';

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

// List of Angular Material modules
const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule { }
