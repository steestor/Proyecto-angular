import { Component, ViewChild } from '@angular/core';
import { DynamicPopupComponent } from 'src/app/shared/components/popups/dynamic-popup/dynamic-popup.component';
import { I18nService } from 'src/app/shared/services';
import { ItiMessage } from 'src/app/shared/utils';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { ChangePasswordFormComponent } from '../change-password-form/change-password-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  customButtons = { hint: this.i18nService.getTranslation('users.change_password'), icon: 'key', visible: true, onClick: this.changePassword.bind(this) };

  public columns = [
    { dataField: 'UserName', width: '15%', caption: this.i18nService.getTranslation('users.user_name'), validationRules: [{ type: 'required' }] },
    { dataField: 'Name', caption: this.i18nService.getTranslation('users.name'), validationRules: [{ type: 'required' }] },
    { dataField: 'PhoneNumber', width: '15%', caption: this.i18nService.getTranslation('users.phone_number') },
    { dataField: 'Email', width: '20%', caption: this.i18nService.getTranslation('users.email'), validationRules: [{ type: 'required' }, { type: 'email' }] },
    { dataField: 'IsActive', width: '15%', dataType: 'boolean', cellTemplate: 'cellTemplate', caption: this.i18nService.getTranslation('users.active') },
    {
      type: 'buttons',
      width: '115px',
      buttons: ['edit', this.customButtons, 'delete']
    },
  ];

  public get users() {
    return this.usersService.users;
  }

  @ViewChild(DynamicPopupComponent) userPopup: DynamicPopupComponent;

  constructor(public usersService: UsersService, public i18nService: I18nService) { }

  changePassword(e: any) {
    if (this.userPopup != null) {
      const user = new User(e.row.data);
      this.userPopup.title = this.i18nService.getTranslation('users.change_password_user') + user.UserName;
      this.userPopup.show(ChangePasswordFormComponent, true, 'User', user)
        .then(this.onComponentCreated.bind(this));
    }
  }

  onComponentCreated(component: ChangePasswordFormComponent) {
    component.onSave.subscribe(this.onChangePasswordSave.bind(this));
  }

  onChangePasswordSave(e: any) {
    this.userPopup.hide();
  }

  onInitNewRow(e) {
    e.data = new User();
  }

  rowUpdated(e: any) {
    this.usersService.saveUser(e.data).then(this.onRowUpdated.bind(this));
  }

  onRowUpdated(value: any) {
    ItiMessage.toast(this.i18nService.getTranslation(value), 'success');
  }

  rowInserted(e: any) {
    this.usersService.saveUser(e.data).then(this.onRowInserted.bind(this));
  }

  onRowInserted(value: any) {
    ItiMessage.toast(this.i18nService.getTranslation(value), 'success');
  }

  rowRemoved(e: any) {
    this.usersService.deleteUser(e.data).then(this.onRowDeleted.bind(this));
  }

  onRowDeleted(value: any) {
    ItiMessage.toast(this.i18nService.getTranslation(value), 'success');
  }
}
