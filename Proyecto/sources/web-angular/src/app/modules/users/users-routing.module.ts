import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent, ChangePasswordFormComponent } from './components';


export const usersComponents = [
  UsersListComponent,
  ChangePasswordFormComponent
]

const routes: Routes = [{
  path: '',
  component: UsersListComponent,
  data: { animation: 'users-list' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
