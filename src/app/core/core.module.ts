import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionHandlerService } from './services/exception-handler/exception-handler.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: ErrorHandler, useClass: ExceptionHandlerService }]
})
export class CoreModule {}
