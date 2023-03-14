import { Component, Input, ViewChild } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CreatePasswordComponent } from '../create-password/create-password.component';

interface AdminResponse {
  adminId: string;
}

@Component({
  selector: 'app-admin-registration-form',
  templateUrl: './admin-registration-form.component.html',
  styleUrls: ['./admin-registration-form.component.css'],
})
export class AdminRegistrationFormComponent {
  @ViewChild('passwordComponent')
  createPasswordComponent!: CreatePasswordComponent;

  @Input() initialRegistration: boolean = true;
  @Input() institutionId: string = '';

  registrationForm = this.formBuilder.group({
    name: '',
    authorization: '',
    email: '',
    contactno: '',
    home: '',
    password: '',
    confirmedPassword: '',
  });

  types: string[] = [];

  isSubmitting: boolean = false;

  registrationErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.types = this.initialRegistration
      ? ['General']
      : ['General', 'Academic', 'Non-Academic'];
  }

  addPasswordError(err: string): void {
    this.registrationErrors.push(err);
  }

  onSubmit(): void {
    const formAdmin = this.registrationForm.value;
    this.registrationErrors = [];

    let currentTypeIndex: number = 0;

    for (let value of Object.values(formAdmin)) {
      if (value == '') {
        this.registrationErrors.push('Fill All Fields!');
        break;
      }
    }

    this.createPasswordComponent.validatePassword();

    const numberPattern = /^[0-9]{10}$/;

    if (formAdmin.contactno && !numberPattern.test(formAdmin.contactno)) {
      this.registrationErrors.push('Invalid Contact No');
    }

    currentTypeIndex = Number(formAdmin.authorization);

    if (this.registrationErrors.length == 0) {
      this.isSubmitting = true;
      const admin = {
        name: formAdmin.name,
        authorization: this.types[currentTypeIndex],
        email: formAdmin.email,
        contactno: formAdmin.contactno,
        home: formAdmin.home,
        institution: this.institutionId,
        password: formAdmin.password,
      };
      console.log(admin);
      this.http.post<AdminResponse>('/api/admins', admin).subscribe(
        (res) => {
          this.registrationForm.reset();
          if (this.initialRegistration) {
            this.router.navigate([
              '/dashboard',
              this.institutionId,
              res.adminId,
            ]);
          } else {
            window.location.reload();
          }

          this.isSubmitting = false;
        },
        (error) => {
          this.registrationErrors.push(error.error.message);
          this.isSubmitting = false;
        }
      );
    }
  }
}
