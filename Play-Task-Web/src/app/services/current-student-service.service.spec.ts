import { TestBed } from '@angular/core/testing';

import { CurrentStudentServiceService } from './current-student-service.service';

describe('CurrentStudentServiceService', () => {
  let service: CurrentStudentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentStudentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
