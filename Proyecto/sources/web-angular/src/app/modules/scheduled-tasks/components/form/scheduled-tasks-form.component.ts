import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ScheduledTaskService } from '../../services';
import { BackgroundTask, ScheduledTask } from '../../models';
import { BaseFormComponent } from '../../../../shared';

@Component({
  selector: 'app-scheduled-tasks-form',
  templateUrl: './scheduled-tasks-form.component.html',
  styleUrls: ['./scheduled-tasks-form.component.scss']
})
export class ScheduledTasksFormComponent extends BaseFormComponent implements OnInit {

  public get scheduledTask(): ScheduledTask {
    return this.scheduledTaskService.scheduledTask;
  }

  public backgroundTasks: BackgroundTask[] = [];

  constructor(public scheduledTaskService: ScheduledTaskService, protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.cargarTareas();
  }

  getParam(params: Params) {
    const id = params['id'];
    if (id != null) {
      this.scheduledTaskService.getScheduledTask(id);
    }
  }

  public onSubmit(e: any) {
    if (this.isAdding) {
      this.scheduledTaskService.insertScheduledTask()
        .then(this.routeToList.bind(this));
    } else {
      this.scheduledTaskService.updateScheduledTask()
        .then(this.routeToList.bind(this));
    }
  }

  protected cargarTareas() {
    this.scheduledTaskService.getBackgroundTasks()
      .then((backgroundTasks: BackgroundTask[]) => this.backgroundTasks = backgroundTasks);
  }

}
