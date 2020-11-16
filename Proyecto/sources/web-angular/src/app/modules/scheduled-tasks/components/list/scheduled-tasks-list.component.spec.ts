import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledTasksListComponent } from './scheduled-tasks-list.component';

describe('ScheduledTasksListComponent', () => {
  let component: ScheduledTasksListComponent;
  let fixture: ComponentFixture<ScheduledTasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledTasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
