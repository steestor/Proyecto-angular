import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { rolesComponents, RolesRoutingModule } from './roles-routing.module';


@NgModule({
  declarations: [
    rolesComponents
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule
  ]
})
export class RolesModule { }
