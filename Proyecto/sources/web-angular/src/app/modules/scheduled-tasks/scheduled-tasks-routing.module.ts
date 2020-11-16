import { nuevo, editar } from './../../shared';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduledTasksFormComponent, ScheduledTasksListComponent } from './components';


export const scheduledTasksComponents = [
  ScheduledTasksFormComponent,
  ScheduledTasksListComponent
]

const routes: Routes = [
  {
    path: '',
    component: ScheduledTasksListComponent,
    data: { animation: 'scheduled-tasks-list' }
  },
  {
    path: `${nuevo}`,
    component: ScheduledTasksFormComponent,
    data: { animation: 'scheduled-tasks-form-nuevo' }
  },
  {
    path: `${editar}/:id`,
    component: ScheduledTasksFormComponent,
    data: { animation: 'scheduled-tasks-form-editar' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledTasksRoutingModule { }
