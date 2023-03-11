import { TestBed } from '@angular/core/testing';

import { CurrentAdminServiceService } from './current-admin-service.service';

describe('CurrentAdminServiceService', () => {
  let service: CurrentAdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentAdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
