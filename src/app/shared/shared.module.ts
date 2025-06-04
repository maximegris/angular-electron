import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, FormsModule]
})
export class SharedModule {}
