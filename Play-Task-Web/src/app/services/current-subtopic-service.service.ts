import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Subtopic } from '../models/current-subtopic-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentSubtopicServiceService {
  private subtopicSubject = new Subject<Subtopic>();
  subtopic$ = this.subtopicSubject.asObservable();

  updateSubtopic(subt: Subtopic) {
    this.subtopicSubject.next(subt);
  }

  constructor() {}
}
