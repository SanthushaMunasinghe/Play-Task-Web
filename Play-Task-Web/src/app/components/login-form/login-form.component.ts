import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

interface UserResponse {
  userid: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  faEyeIcon = faEye;
  faEyeSlashIcon = faEyeSlash;

  @Input() loginUrl = '';
  @Input() institutionId = '';
  @Input() label = '';

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  showPassword: boolean = false;

  isSubmitting: boolean = false;

  loginErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

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
        institution: this.institutionId,
        password: formInstitution.password,
      };

      this.http.post<UserResponse>(this.loginUrl, login).subscribe(
        (res) => {
          console.log(res);
          this.loginForm.reset();
          this.isSubmitting = false;
          this.router.navigate(['/dashboard', this.institutionId, res.userid]);
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
