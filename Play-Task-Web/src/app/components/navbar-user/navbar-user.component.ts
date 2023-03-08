import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Institution, Admin } from 'src/app/models/current-user-model';

import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css'],
})
export class NavbarUserComponent {
  institution: Institution = { id: '', name: '' };

  admin: Admin = { id: '', name: '', authorization: '' };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    const instId = this.route.snapshot.paramMap.get('institutionid');
    const adminId = this.route.snapshot.paramMap.get('adminid');

    //Get Institution
    this.http.get<Institution>(`/api/institution/${instId}/${'id'}`).subscribe(
      (res) => {
        this.currentUserService.updateInstitution(res);
      },
      (error) => {
        console.log(error);
      }
    );

    //Get Admin
    this.http.get<Admin>(`/api/admin/${adminId}/${'id'}`).subscribe(
      (res) => {
        this.currentUserService.updateAdmin(res);
      },
      (error) => {
        console.log(error);
      }
    );

    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        this.institution = institution;
      }
    );

    this.currentUserService.admin$.subscribe((admin: Admin) => {
      this.admin = admin;
    });
  }
}
