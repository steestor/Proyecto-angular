import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesListComponent } from './components';

export const rolesComponents = [
  RolesListComponent
]

const routes: Routes = [{
  path: '',
  component: RolesListComponent,
  data: { animation: 'roles-list' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
