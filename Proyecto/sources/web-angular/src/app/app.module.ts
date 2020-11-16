import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenService } from './shared/services';
import { I18nService } from './shared/services/i18n/i18n.service';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor, ErrorInterceptor } from './core/interceptors';
import { ItiPermissionService } from '@iti/core-ng';
import { permissions } from './fake-permissions';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function i18nProviderFactory(i18nService: I18nService) {
  return () => i18nService.load();
}

export function permissionsProviderFactory(itiPermissionService: ItiPermissionService) {
  return () => itiPermissionService.setPermissions(permissions);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  providers: [ScreenService,
    { provide: APP_INITIALIZER, useFactory: i18nProviderFactory, deps: [I18nService], multi: true },
    { provide: APP_INITIALIZER, useFactory: permissionsProviderFactory, deps: [ItiPermissionService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
