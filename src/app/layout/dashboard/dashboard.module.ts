import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbCarouselModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatModule } from '../../shared';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {PageHeaderModule} from "../../shared/modules/page-header/page-header.module";
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        NgxChartsModule,
        PageHeaderModule,
        Ng2Charts,
        NgbModule.forRoot(),
        ReactiveFormsModule
    ],
    declarations: [
        DashboardComponent,
    ]
})
export class DashboardModule {}
