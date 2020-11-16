import { Component, Input } from '@angular/core';
import { BaseEditorComponent } from '../base-editor.component';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent extends BaseEditorComponent {

  @Input() mask: string;

}
