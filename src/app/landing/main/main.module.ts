import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, MainRoutingModule,FormsModule],
    declarations: [MainComponent]
})
export class MainModule {}
