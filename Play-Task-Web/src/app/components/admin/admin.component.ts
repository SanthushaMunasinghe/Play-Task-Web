import { Component, Input, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CurrentAdmin } from 'src/app/models/current-admin-model';

import { CurrentAdminServiceService } from 'src/app/services/current-admin-service.service';

interface AdminDiff {
  [key: string]: string;
  name: string;
  email: string;
  contactno: string;
  home: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  @Input() institutionId: string = '';

  currentAdmin: CurrentAdmin = {
    _id: '',
    name: '',
    email: '',
    authorization: '',
    contactno: '',
    home: '',
    institution: '',
  };

  editAdminForm: FormGroup = this.formBuilder.group({
    name: '',
    email: '',
    contactno: '',
    home: '',
  });

  types: string[] = ['General', 'Academic', 'Non-Academic'];

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private currentAdminServiceService: CurrentAdminServiceService
  ) {}

  ngOnInit() {
    this.currentAdminServiceService.currentAdmin$.subscribe(
      (admin: CurrentAdmin) => {
        this.currentAdmin = admin;
        this.editAdminForm = this.formBuilder.group({
          name: [this.currentAdmin.name],
          email: [this.currentAdmin.email],
          contactno: [this.currentAdmin.contactno],
          home: [this.currentAdmin.home],
        });
      }
    );
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formAdmins = this.editAdminForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formAdmins)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const admin: AdminDiff = {
        name: formAdmins.name,
        email: formAdmins.email,
        contactno: formAdmins.contactno,
        home: formAdmins.home,
      };

      const updatedAdmin: AdminDiff = {
        name: '',
        email: '',
        contactno: '',
        home: '',
      };

      for (const key in admin) {
        if (this.currentAdmin[key] != admin[key]) {
          updatedAdmin[key] = admin[key];
        }
      }

      console.log(updatedAdmin);
      this.http
        .put(
          `/api/updateadmin/${this.institutionId}/${this.currentAdmin._id}`,
          updatedAdmin
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.isSubmitting = false;
            window.location.reload();
          },
          (error) => {
            this.submitErrors.push(error.error.message);
            this.isSubmitting = false;
          }
        );
    }
  }
}
