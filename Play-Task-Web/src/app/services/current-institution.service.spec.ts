import { TestBed } from '@angular/core/testing';

import { CurrentInstitutionService } from './current-institution.service';

describe('CurrentInstitutionService', () => {
  let service: CurrentInstitutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentInstitutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
