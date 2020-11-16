import { Injectable } from '@angular/core';
import { ItiPermissionService, ItiString } from '@iti/core-ng';
import { navigation } from '../../app-navigation';
import { IMenuItem } from '../interfaces/menu-item.interface';
import { I18nService } from './i18n/i18n.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(protected i18nService: I18nService, protected itiPermissionService: ItiPermissionService) {
    }

    public getMenuItems(): IMenuItem[] {
        return this.i18nService.getTranslations() == null ? [] : this.TranslateMenu(this.filterMenuItems());
    }

    protected filterMenuItems(): IMenuItem[] {
        return this.filterMenuItemsByPermission(navigation);
    }

    protected filterMenuItemsByPermission(menuItem: IMenuItem[]): IMenuItem[] {
        for (let index = menuItem.length - 1; index >= 0; index--) {
            const item = menuItem[index];

            if (item.permission && !this.itiPermissionService.hasPermission(item.permission) && !item.items) {
                menuItem.splice(index, 1);
            }
            if (item.items && item.items.length > 0) {
                item.items = this.filterMenuItemsByPermission(item.items);
                if (item.items.length === 0) {
                    menuItem.splice(index, 1);
                }
            }
        }
        return menuItem;
    }

    protected TranslateMenu(menuItem: IMenuItem[]): IMenuItem[] {
        menuItem.forEach(item => {
            if (item.items && item.items.length > 0) {
                item.items = this.TranslateMenu(item.items);
            }
            if (!ItiString.IsNullOrWhiteSpace(item.i18n)) {
                item.text = this.i18nService.getTranslation(item.i18n);
            }
        });
        return menuItem;
    }
}
