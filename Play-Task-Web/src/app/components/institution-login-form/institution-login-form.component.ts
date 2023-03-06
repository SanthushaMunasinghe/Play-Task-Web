import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

interface InstitutionResponse {
  institutionId: string;
}

@Component({
  selector: 'app-institution-login-form',
  templateUrl: './institution-login-form.component.html',
  styleUrls: ['./institution-login-form.component.css'],
})
export class InstitutionLoginFormComponent {
  faEyeIcon = faEye;
  faEyeSlashIcon = faEyeSlash;

  @Input() loginUrl = '';

  @Output() loginStatus = new EventEmitter<{
    isLoggedIn: boolean;
    id: string;
  }>();

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  showPassword: boolean = false;

  isSubmitting: boolean = false;

  loginErrors: string[] = [''];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    const formInstitution = this.loginForm.value;
    this.loginErrors = [];

    for (let value of Object.values(formInstitution)) {
      if (value == '') {
        this.loginErrors.push('Fill All Fields!');
        break;
      }
    }

    if (this.loginErrors.length == 0) {
      this.isSubmitting = true;

      const login = {
        email: formInstitution.email,
        password: formInstitution.password,
      };

      this.http
        .post<InstitutionResponse>('/api/institutionlogin', login)
        .subscribe(
          (res) => {
            console.log(res);
            this.loginForm.reset();
            this.loginStatus.emit({
              isLoggedIn: true,
              id: res.institutionId,
            });
            this.isSubmitting = false;
          },
          (error) => {
            this.loginErrors.push(error.error.message);
            this.isSubmitting = false;
          }
        );
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
