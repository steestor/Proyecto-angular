import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';
import { ItiAuthGuardService } from '@iti/core-ng'


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [ItiAuthGuardService],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./modules/roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'scheduled-tasks',
        loadChildren: () => import('./modules/scheduled-tasks/scheduled-tasks.module').then(m => m.ScheduledTasksModule)
      },
    ]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
