import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Institution, Admin } from '../models/current-user-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private institutionSubject = new Subject<Institution>();
  institution$ = this.institutionSubject.asObservable();

  private adminSubject = new Subject<Admin>();
  admin$ = this.adminSubject.asObservable();

  updateInstitution(institution: Institution) {
    this.institutionSubject.next(institution);
  }

  updateAdmin(admin: Admin) {
    this.adminSubject.next(admin);
  }

  constructor() {}
}
