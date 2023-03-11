import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Teacher } from '../models/current-teacher-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentTeacherServiceService {
  private teacherSubject = new Subject<Teacher>();
  teacher$ = this.teacherSubject.asObservable();

  updateTeacher(teach: Teacher) {
    this.teacherSubject.next(teach);
  }

  constructor() {}
}
