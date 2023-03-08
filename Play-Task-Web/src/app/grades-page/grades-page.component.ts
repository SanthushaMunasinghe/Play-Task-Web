import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CurrentInstitutionService } from '../current-institution.service';
import { CurrentAdminService } from '../current-admin.service';

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.css'],
})
export class GradesPageComponent {
  // institution: any = this.currentInstitution.getInstitution();
  // admin: any = this.currentAdmin.getAdmin();

  constructor(
    private http: HttpClient,
    private currentInstitution: CurrentInstitutionService,
    private currentAdmin: CurrentAdminService
  ) {}
}
