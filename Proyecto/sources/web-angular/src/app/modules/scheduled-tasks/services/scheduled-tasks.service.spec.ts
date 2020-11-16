import { TestBed } from '@angular/core/testing';

import { ScheduledTasksService } from './scheduled-tasks.service';

describe('ScheduledTasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduledTasksService = TestBed.get(ScheduledTasksService);
    expect(service).toBeTruthy();
  });
});
