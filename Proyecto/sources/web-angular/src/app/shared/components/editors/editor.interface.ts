import { EventEmitter } from '@angular/core';

export interface IEditor {
    value: any;
    valueChange: EventEmitter<any>;
}
