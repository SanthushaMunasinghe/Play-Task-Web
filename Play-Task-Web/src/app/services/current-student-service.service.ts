import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Student } from '../models/current-student-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentStudentServiceService {
  private studentSubject = new Subject<Student>();
  student$ = this.studentSubject.asObservable();

  updateStudent(std: Student) {
    this.studentSubject.next(std);
  }

  constructor() {}
}
