import { Component, OnInit, Input } from '@angular/core';
import { BaseEditorComponent } from '../base-editor.component';

@Component({
  selector: 'app-number-box',
  templateUrl: './number-box.component.html',
  styleUrls: ['./number-box.component.scss']
})
export class NumberBoxComponent extends BaseEditorComponent implements OnInit {

  @Input() showSpinButtons = true;
  @Input() format: string;
  @Input() min: number;
  @Input() max: number;

  ngOnInit() {
  }

}
