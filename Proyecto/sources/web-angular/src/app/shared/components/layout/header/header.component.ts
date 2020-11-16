import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { I18nService } from '../../../services/i18n/i18n.service';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;

  userMenuItems = [{
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.loginService.logout();
    }
  }];

  languages = [];
  languageSelected: any;

  constructor(private i18nService: I18nService, private loginService: LoginService) {
    this.languages = [
      { value: 'es', name: this.i18nService.getTranslation('languages.es'), icon: '/assets/i18n/es.png' },
      { value: 'en', name: this.i18nService.getTranslation('languages.en'), icon: '/assets/i18n/en.png' }
    ];

    this.languageSelected = this.languages.find(x => x.value === this.i18nService.currentLanguage);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  get logo() {
    return environment.logo;
  }

  onLanguageChanged = (e) => {
    this.i18nService.setLanguage(e.item.value);
  }
}
