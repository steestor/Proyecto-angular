import { IEditor } from './editor.interface';
import { Output, EventEmitter, Input } from '@angular/core';

export abstract class BaseEditorComponent implements IEditor {

    // Bloque para qu se pueda hacer two way binging sobre la propiedad 'value'
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
    protected internalValue: any;
    get value() {
        return this.internalValue;
    }
    @Input() set value(newValue) {
        this.setValue(newValue);
    }

    @Input() label: string;
    @Input() hint: string;
    @Input() disabled = false;
    @Input() placeholder: string;
    @Input() readOnly: boolean;
    @Input() showClearButton = true;
    @Input() validationMessageMode = 'always';
    @Input() validationRules: any;
    @Input() width: any;
    @Input() height: any;
    @Input() valueChangeEvent = 'change'; //  "keyup", "blur", "change", and "focusout"
    @Input() stylingMode = 'underlined'; // 'outlined', 'filled', 'underlined'

    @Output() onEnterKey: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFocusIn: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFocusOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.validationRules = [];
    }

    protected setValue(newValue) {
        if (this.internalValue !== newValue) {
            this.internalValue = newValue;
            this.valueChange.emit(this.internalValue);
        }
    }

    enterKey(e: any) {
        this.onEnterKey.emit(e);
    }

    focusOut(e: any) {
        this.onFocusOut.emit(e);
    }

    focusIn(e: any) {
        this.onFocusIn.emit(e);
    }

    valueChanged(e: any) {
        this.onValueChanged.emit(e);
    }
}
