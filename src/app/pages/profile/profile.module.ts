import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [ProfileComponent],
    imports: [CommonModule, SharedModule, ProfileRoutingModule]
})
export class ProfileModule { }
