import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ItiHttpService, ItiString, ItiTokenService } from '@iti/core-ng';
import { Api } from '../api';
import { ItiLogin } from '../models/login/iti-login';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public userName: string = ItiString.Empty;

    constructor(
        protected http: ItiHttpService,
        protected tokenService: ItiTokenService,
        protected router: Router) {
    }

    public login(login: ItiLogin): Promise<boolean> {
        // Descomentar esta línea si se quiere entrar a la aplicación sin login
        // return Promise.resolve(this.onLoginResponse({Success: true, Name: login.userName, Token: 'myTokenHashed'}));

        // Nos aseguramos que la llamada a login no incluya el token en las Headers
        this.tokenService.clearToken();
        this.userName = login.userName;
        return this.http.post(Api.login, login.toJson())
            .then(this.onLoginResponse.bind(this));
    }

    public async logout() {
        this.userName = ItiString.Empty;
        this.tokenService.clearToken();
        this.router.navigate(['/login']);
    }

    private onLoginResponse(res: any) {
        if (res.success) {
            this.tokenService.setToken(res.token);
            return true;
        } else {
            return false;
        }
    }
}
