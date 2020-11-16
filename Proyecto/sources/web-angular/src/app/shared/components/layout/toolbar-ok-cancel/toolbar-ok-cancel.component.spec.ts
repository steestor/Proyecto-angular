import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarOkCancelComponent } from './toolbar-ok-cancel.component';

describe('ToolbarOkCancelComponent', () => {
  let component: ToolbarOkCancelComponent;
  let fixture: ComponentFixture<ToolbarOkCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarOkCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarOkCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
