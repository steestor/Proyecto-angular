import { Component, EventEmitter, Input, Output, Type, ViewChild } from '@angular/core';
import { ItiDynamicLoadComponent } from '@iti/core-ng';


@Component({
    selector: 'app-dynamic-popup',
    templateUrl: 'dynamic-popup.component.html'
})
export class DynamicPopupComponent {

    @Input() title: string;
    @Input() minHeight: any;
    @Input() width: any;
    @Input() height: any = 'auto';
    @Input() dragEnabled = true;
    @Input() resizeEnabled = false;
    @Input() closeOnOutsideClick = true;
    @Input() toolbarItems: any;

    @Output() onHidden: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(ItiDynamicLoadComponent, { static: true }) dynamicLoad: ItiDynamicLoadComponent;

    public popupVisible = false;
    public get component() {
        return this.internalComponent;
    }

    protected internalComponent: any;

    constructor() {
        this.internalComponent = null;
    }

    show(component: Type<any>, alwaysCreate = false, dataPropertyName = null, data: any = null): Promise<any> {
        if (this.internalComponent !== null && !alwaysCreate) {
            this.popupVisible = true;
            if (dataPropertyName != null) {
                this.internalComponent[dataPropertyName] = data;
            }
            return Promise.resolve(this.internalComponent);
        } else {
            return this.dynamicLoad.loadComponent(component, dataPropertyName, data)
                .then(this.onLoadComponent.bind(this));
        }
    }

    hide() {
        this.popupVisible = false;
    }

    hidden(e: any) {
        this.onHidden.emit(e);
    }

    private onLoadComponent(newComponent: any): Promise<any> {
        this.internalComponent = newComponent;
        this.popupVisible = true;
        return Promise.resolve(this.internalComponent);
    }
}
