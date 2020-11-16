import { I18nService } from 'src/app/shared/services';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AppInjector } from '@iti/core-ng';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ItiMessage } from 'src/app/shared/utils/message';
import { LoginService } from '../../shared/services/login.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private i18nService: I18nService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                if (err.status === 401) {
                    return this.invalidCredentials();
                }

                const message = err.message || err.statusText;
                console.error('ErrorInterceptor: ', message);
                return this.composeReturn(message);
            }));
    }

    private invalidCredentials() {
        const message = this.i18nService.getTranslation("erros.401");
        ItiMessage.toast(message);
        const loginService = AppInjector.getInjector().get(LoginService);
        setTimeout(() => loginService.logout(), 1000);
        console.error('401: ' + message);
        return this.composeReturn(message);
    }

    private composeReturn(message: any) {
        if (typeof message === 'string') {
            return throwError([message]);
        }
        return throwError(message);
    }
}
