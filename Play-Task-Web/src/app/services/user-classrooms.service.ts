import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserClassroomsService {
  private classroomsSubject = new Subject<string[]>();
  classrooms$ = this.classroomsSubject.asObservable();

  updateClassrooms(cla: string[]) {
    this.classroomsSubject.next(cla);
  }

  constructor() {}
}
