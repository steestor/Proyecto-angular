import { ItiMessage } from './../../../../shared/utils/message';
import { I18nService, nuevo, editar } from './../../../../shared';
import { ScheduledTask } from './../../models/scheduled-task';
import { Component, OnInit } from '@angular/core';
import { ScheduledTasksService } from '../../services';
import { ItiDatagrid } from '@iti/core-ng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scheduled-tasks-list',
  templateUrl: './scheduled-tasks-list.component.html',
  styleUrls: ['./scheduled-tasks-list.component.scss']
})
export class ScheduledTasksListComponent implements OnInit {

  public get scheduledTasks(): ScheduledTask[] {
    return this.scheduledTasksService.scheduledTasks;
  }
  protected editButton =
    {
      hint: this.i18nService.getTranslation('scheduled_tasks.start'),
      icon: 'edit',
      onClick: this.startTask.bind(this)
    };

  protected startButton =
    {
      hint: this.i18nService.getTranslation('scheduled_tasks.start'),
      icon: 'fa fa-play',
      visible: this.isStartVisible.bind(this),
      onClick: this.startTask.bind(this)
    };

  protected stopButton =
    {
      hint: this.i18nService.getTranslation('scheduled_tasks.stop'),
      icon: 'fa fa-stop',
      visible: this.isStopVisible.bind(this),
      onClick: this.stopTask.bind(this)
    };

  public columns = [
    {
      dataField: 'Name',
      caption: this.i18nService.getTranslation('scheduled_tasks.name')
    },
    {
      dataField: 'Identifier', width: '15%',
      caption: this.i18nService.getTranslation('scheduled_tasks.identifier')
    },
    {
      dataField: 'Cron', width: '20%',
      caption: this.i18nService.getTranslation('scheduled_tasks.cron')
    },
    {
      dataField: 'IsActive', width: '15%',
      dataType: 'boolean', cellTemplate: 'cellTemplate',
      caption: this.i18nService.getTranslation('scheduled_tasks.isActive')
    },
    {
      type: 'buttons',
      width: '115px',
      buttons: [
        'edit',
        this.startButton,
        this.stopButton,
        'delete'
      ]
    },
  ];

  constructor(
    public scheduledTasksService: ScheduledTasksService,
    public i18nService: I18nService,
    protected router: Router,
    protected route: ActivatedRoute) { }

  ngOnInit() {
    this.cargarTareasProgramadas();
  }

  public cargarTareasProgramadas() {
    this.scheduledTasksService.getScheduledTasks();
  }

  public onToolbarPreparing(e: any) {
    ItiDatagrid.toolbarAddNewButton(e, this.add.bind(this));
  }

  public add() {
    const routeTo = `./${nuevo}`;
    this.router.navigate([routeTo], { relativeTo: this.route });
  }

  public edit(e: any) {
    const routeTo = `./${editar}/${e.data.Id}`;
    this.router.navigate([routeTo], { relativeTo: this.route });
  }

  public onRowRemoved(e: any) {
    this.scheduledTasksService.deleteScheduledTasks(e.data)
      .then(this.onRowRemovedComplete.bind(this));
  }

  public startTask(e: any) {
    this.scheduledTasksService.start(e.data);
  }

  public stopTask(e: any) {
    this.scheduledTasksService.stop(e.data);
  }

  protected onRowRemovedComplete(res: any) {
    ItiMessage.toast(this.i18nService.getTranslation('remove_ok'));
  }

  protected isStartVisible(e: any) {
    return e.row.data.IsRunning === false;
  }

  protected isStopVisible(e: any) {
    return e.row.data.IsRunning === true;
  }

}
