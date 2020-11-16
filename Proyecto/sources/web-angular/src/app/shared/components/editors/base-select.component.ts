import { BaseEditorComponent } from './base-editor.component';
import { Input } from '@angular/core';

export abstract class BaseSelectComponent extends BaseEditorComponent {
    @Input() items: any[] = [];
    @Input() valueExpr = 'id';
    @Input() displayExpr = 'nombre';

}
