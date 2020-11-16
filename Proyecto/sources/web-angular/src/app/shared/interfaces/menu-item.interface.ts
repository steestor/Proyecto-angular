export interface IMenuItem {
    icon?: string;
    text?: string;
    i18n?: string;
    path?: string;
    href?: string;
    permission?: string;
    items?: IMenuItem[];
}
