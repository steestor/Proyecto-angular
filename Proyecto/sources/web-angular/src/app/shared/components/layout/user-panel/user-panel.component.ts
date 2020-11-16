import { ItiString } from '@iti/core-ng';
import { LoginService } from './../../../services/login.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})

export class UserPanelComponent {
  @Input() menuItems: any;

  @Input() menuMode: string;

  public get userName() {
    return ItiString.IsNullOrWhiteSpace(this.loginService.userName) ? 'Nombre usuario' : this.loginService.userName;
  }

  constructor(protected loginService: LoginService) { }
}
