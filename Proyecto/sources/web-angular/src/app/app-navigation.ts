import { IMenuItem } from './shared/interfaces/menu-item.interface';
import { Permission } from './shared/permissions';

export const navigation: IMenuItem[] = [
  {
    i18n: 'menu.home',
    path: '/home',
    icon: 'home'
  },
  {
    i18n: 'menu.administration',
    icon: 'preferences',
    items: [
      {
        i18n: 'menu.roles',
        path: '/roles',
        permission: Permission.readRoles
      },
      {
        i18n: 'menu.users',
        path: '/users',
        permission: Permission.readUsuarios
      },
      {
        i18n: 'menu.scheduled-tasks',
        path: '/scheduled-tasks',
      }
    ]
  }
];
