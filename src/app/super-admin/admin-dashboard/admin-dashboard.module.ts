import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { PageHeaderModule } from './../../shared';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule,FormsModule,ReactiveFormsModule, AdminDashboardRoutingModule, PageHeaderModule,  NgbModule.forRoot(),],
    declarations: [AdminDashboardComponent]
})
export class AdminDashboardModule {}
