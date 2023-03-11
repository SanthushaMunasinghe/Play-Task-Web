import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Institution } from 'src/app/models/current-user-model';
import { CurrentAdmin } from 'src/app/models/current-admin-model';

import { CurrentUserService } from 'src/app/services/current-user.service';
import { CurrentAdminServiceService } from 'src/app/services/current-admin-service.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
})
export class AdminListComponent {
  adminList: CurrentAdmin[] = [];
  admin: CurrentAdmin = {
    _id: '',
    name: '',
    email: '',
    authorization: '',
    contactno: '',
    home: '',
    institution: '',
  };

  institutionId: string = '';

  selectedAdminIndex: number = 0;

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService,
    private currentAdminServiceService: CurrentAdminServiceService
  ) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe((inst: Institution) => {
      this.institutionId = inst.id;

      //Get Topic
      this.http
        .get<CurrentAdmin[]>(`/api/getadmins/${this.institutionId}`)
        .subscribe(
          (res) => {
            this.adminList = res;
            this.admin = this.adminList[0];
            this.currentAdminServiceService.updateCurrentAdmin(this.admin);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  onAdminSelect() {
    this.admin = this.adminList[this.selectedAdminIndex];
    this.currentAdminServiceService.updateCurrentAdmin(this.admin);
  }
}
