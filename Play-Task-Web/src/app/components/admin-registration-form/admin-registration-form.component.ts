import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

interface AdminResponse {
  institutionId: string;
}

@Component({
  selector: 'app-admin-registration-form',
  templateUrl: './admin-registration-form.component.html',
  styleUrls: ['./admin-registration-form.component.css'],
})
export class AdminRegistrationFormComponent {
  faEyeIcon = faEye;
  faEyeSlashIcon = faEyeSlash;

  @Input() initialRegistration: boolean = false;
  @Input() institutionId: string = '63f5c0ac91b937d3af647cb0';

  registrationForm = this.formBuilder.group({
    name: '',
    authorization: '',
    email: '',
    contactno: '',
    home: '',
    password: '',
    confirmedPassword: '',
  });

  types: string[] = this.initialRegistration
    ? ['General']
    : ['General', 'Academic', 'Non-Academic'];

  showPassword: boolean = false;

  isSubmitting: boolean = false;

  registrationErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    this.isSubmitting = true;

    const formAdmin = this.registrationForm.value;
    this.registrationErrors = [];

    let currentTypeIndex: number = 0;

    for (let value of Object.values(formAdmin)) {
      if (value == '') {
        this.registrationErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    const passwordPattern =
      /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (formAdmin.password) {
      if (formAdmin.password.length < 8) {
        this.registrationErrors.push('Password Must Be 8-16 Characters');
        this.isSubmitting = false;
      } else if (!passwordPattern.test(formAdmin.password)) {
        this.registrationErrors.push(
          'Your Password Must Contain At Least One Uppercase Letter, One Lowercase Letter, One Number, And One Special Character.'
        );
        this.isSubmitting = false;
      } else if (formAdmin.password != formAdmin.confirmedPassword) {
        this.registrationErrors.push('Password Does Not Match!');
        this.isSubmitting = false;
      }
    }

    const numberPattern = /^[0-9]{10}$/;

    if (formAdmin.contactno && !numberPattern.test(formAdmin.contactno)) {
      this.registrationErrors.push('Invalid Contact No');
      this.isSubmitting = false;
    }

    currentTypeIndex = Number(formAdmin.authorization);

    if (this.registrationErrors.length == 0) {
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
          console.log(res);
          this.registrationForm.reset();
          console.log(res.institutionId);
          this.isSubmitting = false;
        },
        (error) => {
          this.registrationErrors.push(error.error.message);
          this.isSubmitting = false;
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
