import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import {ParticlesModule} from "angular-particle";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, ResetPasswordRoutingModule,ParticlesModule,FormsModule],
    declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule {}
