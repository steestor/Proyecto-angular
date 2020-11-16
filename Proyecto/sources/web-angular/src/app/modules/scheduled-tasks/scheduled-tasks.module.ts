import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { scheduledTasksComponents, ScheduledTasksRoutingModule } from './scheduled-tasks-routing.module';
import { ScheduledTasksService } from './services/scheduled-tasks.service';

@NgModule({
  declarations: [
    scheduledTasksComponents
  ],
  imports: [
    CommonModule,
    ScheduledTasksRoutingModule,
    SharedModule
  ],
  providers: [ScheduledTasksService]
})
export class ScheduledTasksModule { }
