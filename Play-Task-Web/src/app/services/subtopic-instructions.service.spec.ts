import { TestBed } from '@angular/core/testing';

import { SubtopicInstructionsService } from './subtopic-instructions.service';

describe('SubtopicInstructionsService', () => {
  let service: SubtopicInstructionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtopicInstructionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
