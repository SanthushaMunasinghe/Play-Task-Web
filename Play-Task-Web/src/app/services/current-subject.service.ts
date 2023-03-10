import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SubjectModel } from '../models/current-subject-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentSubjectService {
  private subjectSubject = new Subject<SubjectModel>();
  subject$ = this.subjectSubject.asObservable();

  updateInstitution(subject: SubjectModel) {
    this.subjectSubject.next(subject);
  }
  constructor() {}
}
