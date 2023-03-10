import { TestBed } from '@angular/core/testing';

import { CurrentSubjectService } from './current-subject.service';

describe('CurrentSubjectService', () => {
  let service: CurrentSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
