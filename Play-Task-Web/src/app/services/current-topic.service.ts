import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Topic } from '../models/current-topic-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentTopicService {
  private topicSubject = new Subject<Topic>();
  topic$ = this.topicSubject.asObservable();

  updateTopic(topic: Topic) {
    this.topicSubject.next(topic);
  }
  constructor() {}
}
