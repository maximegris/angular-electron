import { NgModule } from '@angular/core';

import { MatButtonModule } from "@angular/material/button";

// List of Angular Material modules
const materialModules = [
  MatButtonModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule { }
