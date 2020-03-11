import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';

import { SignInComponent } from './sign-in.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [SignInComponent],
    imports: [CommonModule, SharedModule, SignInRoutingModule]
})
export class SignInModule { }
