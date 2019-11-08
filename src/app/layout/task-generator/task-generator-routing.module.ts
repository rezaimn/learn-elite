import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskGeneratorComponent } from './task-generator.component';

const routes: Routes = [
    {
        path: '', component: TaskGeneratorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskGeneratorRoutingModule {
}
