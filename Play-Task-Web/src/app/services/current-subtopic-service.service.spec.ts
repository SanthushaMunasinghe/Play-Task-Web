import { TestBed } from '@angular/core/testing';

import { CurrentSubtopicServiceService } from './current-subtopic-service.service';

describe('CurrentSubtopicServiceService', () => {
  let service: CurrentSubtopicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSubtopicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
