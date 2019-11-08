import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {ParticlesModule} from "angular-particle";
import {FormsModule} from "@angular/forms";
import {CustomFormsModule} from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
      ParticlesModule,
      FormsModule,
      CustomFormsModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
