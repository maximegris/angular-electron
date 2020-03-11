import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyEmailRoutingModule } from './verify-email-routing.module';

import { VerifyEmailComponent } from './verify-email.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [VerifyEmailComponent],
    imports: [CommonModule, SharedModule, VerifyEmailRoutingModule]
})
export class VerifyEmailModule { }
