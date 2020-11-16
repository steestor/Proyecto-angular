import { Injectable } from '@angular/core';
import { ItiHttpService, ItiString } from '@iti/core-ng';
import { ScheduledTask } from '../models/scheduled-task';
import { Api } from './../../../shared';

@Injectable()
export class ScheduledTasksService {

  public scheduledTasks: ScheduledTask[] = [];

  constructor(protected http: ItiHttpService) { }

  public getScheduledTasks(): Promise<ScheduledTask[]> {
      return this.http.get(Api.scheduledTasks)
        .then(this.onGetScheduledTasks.bind(this));
  }

  public start(scheduledTask: ScheduledTask): Promise<any> {
    const url = ItiString.Format(Api.scheduledTaskIdStart, scheduledTask.Id);
    return this.http.put(url, null);
  }

  public stop(scheduledTask: ScheduledTask) {
    const url = ItiString.Format(Api.scheduledTaskIdStop, scheduledTask.Id);
    return this.http.put(url, null);
  }

  public deleteScheduledTasks(scheduledTask: ScheduledTask): Promise<any> {
    const url = ItiString.Format(Api.scheduledTaskId, scheduledTask.Id);
    return this.http.delete(url);
  }

  protected onGetScheduledTasks(res: ScheduledTask[]) {
    this.scheduledTasks = res.map(x => new ScheduledTask(x));
    return res;
  }

}
