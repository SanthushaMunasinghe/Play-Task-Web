import { TestBed } from '@angular/core/testing';

import { UserSubjectsService } from './user-subjects.service';

describe('UserSubjectsService', () => {
  let service: UserSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
