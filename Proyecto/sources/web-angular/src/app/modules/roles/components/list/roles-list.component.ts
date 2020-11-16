import { I18nService } from '../../../../shared/services/i18n/i18n.service';
import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  public columns = [
    { dataField: 'Name', caption: this.i18nService.getTranslation('roles.name'), validationRules: [{ type: 'required' }] },
    { dataField: 'Description', caption: this.i18nService.getTranslation('roles.description') }
  ];

  public get roles() {
    return this.rolesService.roles;
  }

  constructor(public rolesService: RolesService, public i18nService: I18nService) { }

  ngOnInit(): void {

  }

}
