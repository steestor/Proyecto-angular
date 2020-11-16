import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar-ok-cancel',
  templateUrl: './toolbar-ok-cancel.component.html',
  styleUrls: ['./toolbar-ok-cancel.component.scss']
})
export class ToolbarOkCancelComponent {

  @Input() fixedBottom = false;

  @Output() onOk: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  public ok() {
    this.onOk.emit(null);
  }

  public cancel() {
    this.onCancel.emit(null);
  }

}
