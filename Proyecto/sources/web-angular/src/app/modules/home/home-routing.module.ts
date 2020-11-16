import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components';

export const homeComponents = [
  HomeComponent
];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'home' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
