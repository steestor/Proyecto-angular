import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersListComponent } from './components/list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';

@NgModule({
  declarations: [
    UsersListComponent,
    ChangePasswordFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
