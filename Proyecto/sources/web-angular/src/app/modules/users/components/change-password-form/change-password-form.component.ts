import { ItiMessage } from './../../../../shared/utils/message';
import { I18nService } from '../../../../shared/services/i18n/i18n.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {

  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  public currentPassword: string;
  public newPassword: string;

  validationRules = [
    { type: 'required' }
  ];

  validationRuleConfirmation = [
    { type: 'required' },
    {
      type: 'compare', comparisonTarget: () => this.newPassword,
      message: this.i18nService.getTranslation('users.password_validation_compare')
    }
  ];

  constructor(private i18nService: I18nService) { }

  ngOnInit() {
  }

  public cancel() {
    this.onSave.emit(null);
  }

  public onSubmit(e: any) {
    ItiMessage.alert('Constraseña cambiada correctamente');
    this.onSave.emit(true);
  }
}
