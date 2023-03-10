import { TestBed } from '@angular/core/testing';

import { CurrentTopicService } from './current-topic.service';

describe('CurrentTopicService', () => {
  let service: CurrentTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
