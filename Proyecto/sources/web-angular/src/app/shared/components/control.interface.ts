import { EventEmitter } from '@angular/core';

export interface IControl {
    label: any;
    value: any;
    valueChange: EventEmitter<any>;

    validate();
}