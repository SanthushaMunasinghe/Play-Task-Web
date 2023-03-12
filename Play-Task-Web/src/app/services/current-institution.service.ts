import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CurrentInstitution } from '../models/current-institution-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentInstitutionService {
  private institutionSubject = new Subject<CurrentInstitution>();
  institution$ = this.institutionSubject.asObservable();

  updateCurrentInstitution(inst: CurrentInstitution) {
    this.institutionSubject.next(inst);
  }

  constructor() {}
}
