import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

interface InstitutionResponse {
  institutionId: string;
}

@Component({
  selector: 'app-institution-registration-form',
  templateUrl: './institution-registration-form.component.html',
  styleUrls: ['./institution-registration-form.component.css'],
})
export class InstitutionRegistrationFormComponent {
  faEyeIcon = faEye;
  faEyeSlashIcon = faEyeSlash;

  @Output() registrationStatus = new EventEmitter<{
    isRegistered: boolean;
    id: string;
  }>();

  registrationForm = this.formBuilder.group({
    name: '',
    type: '',
    email: '',
    contactno: '',
    location: '',
    password: '',
    confirmedPassword: '',
  });

  types: string[] = ['School', 'Primary School', 'Tution'];

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

    const formInstitution = this.registrationForm.value;
    this.registrationErrors = [];

    let currentTypeIndex: number = 0;

    for (let value of Object.values(formInstitution)) {
      if (value == '') {
        this.registrationErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    const passwordPattern =
      /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (formInstitution.password) {
      if (formInstitution.password.length < 8) {
        this.registrationErrors.push('Password Must Be 8-16 Characters');
        this.isSubmitting = false;
      } else if (!passwordPattern.test(formInstitution.password)) {
        this.registrationErrors.push(
          'Your Password Must Contain At Least One Uppercase Letter, One Lowercase Letter, One Number, And One Special Character.'
        );
        this.isSubmitting = false;
      } else if (
        formInstitution.password != formInstitution.confirmedPassword
      ) {
        this.registrationErrors.push('Password Does Not Match!');
        this.isSubmitting = false;
      }
    }

    const numberPattern = /^[0-9]{10}$/;

    if (
      formInstitution.contactno &&
      !numberPattern.test(formInstitution.contactno)
    ) {
      this.registrationErrors.push('Invalid Contact No');
      this.isSubmitting = false;
    }

    currentTypeIndex = Number(formInstitution.type);

    if (this.registrationErrors.length == 0) {
      const inst = {
        name: formInstitution.name,
        type: this.types[currentTypeIndex],
        location: formInstitution.location,
        email: formInstitution.email,
        contactno: formInstitution.contactno,
        password: formInstitution.password,
      };

      this.http.post<InstitutionResponse>('/api/institutions', inst).subscribe(
        (res) => {
          console.log(res);
          this.registrationForm.reset();
          this.registrationStatus.emit({
            isRegistered: true,
            id: res.institutionId,
          });
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
