import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { PageHeaderModule } from './../../shared';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule,ReactiveFormsModule,PaymentsRoutingModule, PageHeaderModule,  NgbModule.forRoot(),],
    declarations: [PaymentsComponent]
})
export class PaymentsModule {}
