import { I18nService } from './shared/services/i18n/i18n.service';
import { Component, HostBinding } from '@angular/core';
import { ScreenService } from './shared/services';
import { ItiLoadingService } from '@iti/core-ng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(
    private screen: ScreenService,
    private i18nService: I18nService,
    private loadingService: ItiLoadingService) {
    this.loadingService.setLoadingText(this.i18nService.getTranslation('loading'));
  }
}
