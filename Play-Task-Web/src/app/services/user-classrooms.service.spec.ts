import { TestBed } from '@angular/core/testing';

import { UserClassroomsService } from './user-classrooms.service';

describe('UserClassroomsService', () => {
  let service: UserClassroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserClassroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
