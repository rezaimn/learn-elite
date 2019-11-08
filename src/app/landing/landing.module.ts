import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

import {ParticlesModule} from "angular-particle";
import {LandingFooterComponent} from "./landing-footer/landing-footer.component";
// import {SidebarComponent} from "../sidebar/sidebar.component";

@NgModule({
    imports: [CommonModule, LandingRoutingModule,ParticlesModule],
    declarations: [LandingComponent,LandingFooterComponent]
})
export class LandingModule {

}
