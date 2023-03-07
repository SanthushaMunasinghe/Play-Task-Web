import { Injectable } from '@angular/core';

interface Institution {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentInstitutionService {
  institution: Institution = { id: '', name: '' };

  assignInstitution(inst: Institution) {
    this.institution = inst;
  }

  getInstitution() {
    return this.institution;
  }

  constructor() {}
}
