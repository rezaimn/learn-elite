import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {ParticlesModule} from "angular-particle";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, LoginRoutingModule,ParticlesModule,FormsModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
