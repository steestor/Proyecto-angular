import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledTasksFormComponent } from './scheduled-tasks-form.component';

describe('ScheduledTasksFormComponent', () => {
  let component: ScheduledTasksFormComponent;
  let fixture: ComponentFixture<ScheduledTasksFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledTasksFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledTasksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
