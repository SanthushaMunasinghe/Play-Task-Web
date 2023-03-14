import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UserClassroom } from '../models/user-classroom-model';

@Injectable({
  providedIn: 'root',
})
export class TeacherClassroomsService {
  private classroomsSubject = new Subject<UserClassroom[]>();
  classrooms$ = this.classroomsSubject.asObservable();

  updateClassrooms(cla: UserClassroom[]) {
    this.classroomsSubject.next(cla);
  }

  constructor() {}
}
