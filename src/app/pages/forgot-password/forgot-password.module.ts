import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [CommonModule, SharedModule, ForgotPasswordRoutingModule]
})
export class ForgotPasswordModule { }
