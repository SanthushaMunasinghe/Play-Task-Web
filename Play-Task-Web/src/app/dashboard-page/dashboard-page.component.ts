import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CurrentInstitutionService } from '../current-institution.service';

interface InstitutionResponse {
  id: string;
  name: string;
}

interface AdminResponse {
  id: string;
  name: string;
  authorization: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  institution: InstitutionResponse = { id: '', name: '' };

  admin: AdminResponse = { id: '', name: '', authorization: '' };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private currentInstitution: CurrentInstitutionService
  ) {}

  ngOnInit() {
    const instId = this.route.snapshot.paramMap.get('institutionid');
    const adminId = this.route.snapshot.paramMap.get('adminid');

    //Get Institution
    this.http
      .get<InstitutionResponse>(`/api/institution/${instId}/${'id'}`)
      .subscribe(
        (res) => {
          this.currentInstitution.assignInstitution(res);
          this.institution = this.currentInstitution.getInstitution();
        },
        (error) => {
          console.log(error);
        }
      );

    //Get Admin
    this.http.get<AdminResponse>(`/api/admin/${adminId}/${'id'}`).subscribe(
      (res) => {
        this.admin = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
