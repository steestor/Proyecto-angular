import { Api } from './../../../shared';
import { Injectable } from '@angular/core';
import { ItiHttpService, ItiString } from '@iti/core-ng';
import { ScheduledTask } from '../models/scheduled-task';
import { BackgroundTask } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ScheduledTaskService {

  public scheduledTask: ScheduledTask;

  constructor(protected http: ItiHttpService) { 
    this.scheduledTask = new ScheduledTask();
  }

  public getBackgroundTasks(): Promise<BackgroundTask[]> {
    // Descomentar esta línea para obtener los elementos del Api
    // return this.http.get(Api.backgroundTasks);

    // Simulamos tener datos para ver la funcionalidad sobre el formulario
    return Promise.resolve([
      new BackgroundTask({Identifier: 'CleanCache', Description: 'Limpiar cache'}),
      new BackgroundTask({Identifier: 'ShrinkSize', Description: 'Reducir tamaños de archivos'})
    ]);
  }

  public getScheduledTask(id: number): Promise<ScheduledTask[]> {
    const url = ItiString.Format(Api.scheduledTaskIdStart, id);
    return this.http.get(url)
      .then(this.onGetScheduledTask.bind(this));
  }

  public insertScheduledTask(): Promise<any> {
    return this.http.post(Api.scheduledTasks, this.scheduledTask.toJson());
  }

  public updateScheduledTask(): Promise<any> {
    return this.http.put(Api.scheduledTasks, this.scheduledTask.toJson());
  }

  protected onGetScheduledTask(res: ScheduledTask) {
    this.scheduledTask = new ScheduledTask(res);
    return res;
  }

}
