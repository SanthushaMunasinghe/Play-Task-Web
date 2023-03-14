import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UserSubject } from '../models/user-subject-model';

@Injectable({
  providedIn: 'root',
})
export class TeacherSubjectsService {
  private subjectsSubject = new Subject<UserSubject[]>();
  subjects$ = this.subjectsSubject.asObservable();

  updateSubjects(subj: UserSubject[]) {
    this.subjectsSubject.next(subj);
  }

  constructor() {}
}
