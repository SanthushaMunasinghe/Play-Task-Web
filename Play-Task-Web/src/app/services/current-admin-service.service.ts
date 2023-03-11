import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CurrentAdmin } from '../models/current-admin-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentAdminServiceService {
  private currentAdminSubject = new Subject<CurrentAdmin>();
  currentAdmin$ = this.currentAdminSubject.asObservable();

  updateCurrentAdmin(admin: CurrentAdmin) {
    this.currentAdminSubject.next(admin);
  }

  constructor() {}
}
