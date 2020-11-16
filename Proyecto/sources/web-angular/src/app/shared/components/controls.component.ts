import { EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ItiString } from '@iti/core-ng';
import { DxValidatorComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { IControl } from './control.interface';
import { I18nService } from '../services/i18n/i18n.service';


export abstract class ControlsComponent implements IControl, OnInit, OnDestroy {

    validationMessages = [
        { type: 'required', message: this.i18nService.getTranslation('validations.required') },
        { type: 'compare', message: this.i18nService.getTranslation('validations.compare') }];

    @Input() id: any;
    @Input() label: any;
    @Input() readonly = false;
    @Input() validationRules: any;
    @Input() disabled = false;
    @Input() width: any;
    @Input() hint: string;
    @Input() showClearButton = false;
    @Input() nestedValidate: IControl = null;
    @Input() placeholder: string;

    @Output() onFocusIn: EventEmitter<any> = new EventEmitter<any>();
    @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEnterKey: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(DxValidatorComponent) validator: DxValidatorComponent;

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
    protected _value: any;
    get value() {
        return this._value;
    }
    @Input() set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this.valueChange.emit(this._value);
        }
    }

    private onMyValueChangeSubscription: Subscription = null;

    constructor(private i18nService: I18nService) {
        this.validationRules = [];
    }

    ngOnInit() {
        if (this.isRequired() && this.label != null) {
            this.label = this.label + ' *';
        }

        this.translateValidationMessages();

        if (this.nestedValidate != null) {
            this.onMyValueChangeSubscription = this.valueChange.subscribe(this.onMyValueChange.bind(this));
        }
    }

    ngOnDestroy(): void {
        if (this.onMyValueChangeSubscription != null) {
            this.onMyValueChangeSubscription.unsubscribe();
        }
    }

    getCleanLabel(label: any = this.label) {
        if (label != null && label.substr(label.length - 1, 1) === '*') {
            return label.substr(0, label.length - 1);
        } else {
            return label;
        }
    }

    isRequired(): boolean {
        let result = false;

        if (this.validationRules) {
            this.validationRules.forEach(item => {
                if (item.type !== null && item.type === 'required') {
                    result = true;
                }
            });
        }

        return result;
    }

    getMessageForType(type: string) {
        const index = this.validationMessages.findIndex(x => x.type === type);
        if (index !== -1) {
            return this.validationMessages[index].message;
        } else {
            return null;
        }
    }

    translateValidationMessages() {
        if (this.validationRules) {
            this.validationRules.forEach(item => {
                if (item.message == null && item.type !== null) {
                    const message = this.getMessageForType(item.type);
                    if (message != null) {
                        const cleanLabel = this.getCleanLabel();
                        item.message = ItiString.Format(message, cleanLabel);
                    }
                }
            });
        }
    }

    validate() {
        if (this.validator != null) {
            this.validator.instance.validate();
        }
    }

    onMyValueChange() {
        if (this.nestedValidate != null) {
            this.nestedValidate.validate();
        }
    }

    focusIn() {
        this.onFocusIn.emit(null);
    }

    valueChanged(e: any) {
        this.onValueChanged.emit(e.value);
    }

    enterKey(e: any) {
        this.onEnterKey.emit(e);
    }
}
