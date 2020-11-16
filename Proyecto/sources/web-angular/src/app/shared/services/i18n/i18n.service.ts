import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { loadMessages, locale } from 'devextreme/localization';
import enMessages from 'devextreme/localization/messages/en.json';
import esMessages from 'devextreme/localization/messages/es.json';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class I18nService {

    public state: EventEmitter<any>;
    public translations: {};
    public currentLanguage: any;

    private localStorageKey = 'i18nLanguage';

    constructor(private translate: TranslateService) {
        this.state = new EventEmitter<any>();
    }

    // Método de carga inicial de idioma cuando arranca la aplicación
    // Se invoca desde un factory en el App.Module, y devuelve una Promise para que la aplicación
    // espere a la carga de sus datos antes de completar el arranque
    public load(): Promise<any> {
        const savedLanguage = localStorage.getItem(this.localStorageKey);

        // Establece idioma de los componentes de devextreme
        loadMessages(esMessages);
        loadMessages(enMessages);

        return this.initLanguage(savedLanguage || environment.defaultLocale);
    }

    public setLanguage(language: string) {
        this.saveCurrentLanguageOnlocal(language);
        window.location.reload();
    }

    public getTranslation(key: string): string {
        return this.translate.instant(key);
    }

    public getTranslations(): any {
        return this.translate.translations;
    }

    protected getCurrentLanguage(): string {
        if (localStorage.getItem(this.localStorageKey)) {
            return localStorage.getItem(this.localStorageKey)
        } else {
            return environment.defaultLocale;
        }
    }

    protected saveCurrentLanguageOnlocal(language: string) {
        localStorage.setItem(this.localStorageKey, language);
    }

    protected async initLanguage(language: string) {
        this.currentLanguage = this.getCurrentLanguage();
        locale(language);
        return await this.translate.use(language).toPromise();
    }
}
