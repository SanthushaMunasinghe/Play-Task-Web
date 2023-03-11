import { TestBed } from '@angular/core/testing';

import { CurrentTeacherServiceService } from './current-teacher-service.service';

describe('CurrentTeacherServiceService', () => {
  let service: CurrentTeacherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTeacherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
