import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        SuperAdminRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        ReactiveFormsModule,

    ],
    declarations: [SuperAdminComponent]
})
export class SuperAdminModule {}
