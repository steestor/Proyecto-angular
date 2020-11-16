import { Component, Input } from '@angular/core';
import { BaseEditorComponent } from '../base-editor.component';
import { EnumPasswordMode } from './password-mode.enum';

@Component({
  selector: 'app-password-box',
  templateUrl: './password-box.component.html',
  styleUrls: ['./password-box.component.scss']
})
export class PasswordBoxComponent extends BaseEditorComponent {

  @Input() width = '100%';
  @Input() passwordMode = EnumPasswordMode.password;

  public get passwordIcon() {
    return this.passwordMode === EnumPasswordMode.password ? 'fas fa-eye' : 'fas fa-eye-slash';
  }
  passwordButton = null;

  constructor() {
    super();
    this.width = '100%';
    this.setPasswordButton();
  }

  public changePasswordMode() {
    this.passwordMode = this.passwordMode === EnumPasswordMode.text ? EnumPasswordMode.password : EnumPasswordMode.text;
    this.setPasswordButton();
  }

  protected setPasswordButton() {
    this.passwordButton = {
      icon: this.passwordIcon,
      stylingMode: 'text',
      type: 'default',
      onClick: this.changePasswordMode.bind(this)
    };
  }

}
