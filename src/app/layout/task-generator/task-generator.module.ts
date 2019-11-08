import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskGeneratorRoutingModule } from './task-generator-routing.module';
import { TaskGeneratorComponent } from './task-generator.component';
import { PageHeaderModule } from './../../shared';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TaskGeneratorRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot(),],
    declarations: [TaskGeneratorComponent]
})
export class TaskGeneratorModule {}
