import { ItiTokenService } from '@iti/core-ng';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private tokenService: ItiTokenService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.tokenService.hasToken()) {
            let headers = request.headers || new HttpHeaders();
            headers = headers.append('Authorization', `Bearer ${this.tokenService.getToken()}`);
            request = request.clone({ headers });
        }

        return next.handle(request);
    }
}
