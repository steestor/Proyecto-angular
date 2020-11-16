import { Component, Input } from '@angular/core';
import { BaseEditorComponent } from '../base-editor.component';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent extends BaseEditorComponent {

  @Input() text: string;

}
