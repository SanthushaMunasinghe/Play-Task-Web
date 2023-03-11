import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSubjectsService {
  private subjectsSubject = new Subject<string[]>();
  subjects$ = this.subjectsSubject.asObservable();

  updateInstructions(subj: string[]) {
    this.subjectsSubject.next(subj);
  }

  constructor() {}
}
