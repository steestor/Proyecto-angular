import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ItiLogin } from '../../../shared/models/login/iti-login';
import { I18nService } from '../../../shared/services/i18n/i18n.service';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  public login = '';
  public password = '';
  public credentials: ItiLogin;

  // Indicador de que hay una acción de login en progreso
  public loginInProgress = false;

  // Mensaje de resultado de login
  public loginMessage: string = null;

  // constructor(private authService: AuthService) { }
  constructor(private i18nService: I18nService, private loginService: LoginService, private router: Router, private titleService: Title ) {
    this.credentials = new ItiLogin();
    this.titleService.setTitle(environment.appTitle);
  }

  public async onLoginClick(args) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }

    this.loginInProgress = true;
    try {
      await this.doLogin();
    } catch (error) {
      this.loginMessage = this.i18nService.getTranslation('login.error');
      console.log(error);
    }
    this.loginInProgress = false;

    args.validationGroup.reset();
  }

  protected async doLogin() {
    this.loginMessage = null;
    const loginOk = await this.loginService.login(this.credentials);

    if (loginOk) {
      this.routeToHome();
    } else {
      this.loginMessage = this.i18nService.getTranslation('login.incorrect');
    }
  }

  private routeToHome() {
    this.router.navigate(['/home']);
  }

  get title() {
    return environment.appTitle;
  }

  get logo() {
    return environment.logo;
  }
}
