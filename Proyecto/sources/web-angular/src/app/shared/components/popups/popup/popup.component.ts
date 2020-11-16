import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: 'popup.component.html'
})
export class PopupComponent {

    @Input() showTitle = true;
    @Input() title: string;
    @Input() dragEnabled = true;
    @Input() resizeEnabled = false;
    @Input() closeOnOutsideClick = true;
    @Input() minHeight: any;
    @Input() width: any;
    @Input() height: any = 'auto';
    @Input() toolbarItems: any;

    @Output() visibleChange: EventEmitter<any> = new EventEmitter<any>();
    private internalVisible: any;
    get visible() {
        return this.internalVisible;
    }
    @Input() set visible(newvisible) {
        if (this.internalVisible !== newvisible) {
            this.internalVisible = newvisible;
            this.visibleChange.emit(this.internalVisible);
        }
    }

    @Output() onHidden: EventEmitter<any> = new EventEmitter<any>();

    hidden(e: any) {
        this.onHidden.emit(e);
    }
}
