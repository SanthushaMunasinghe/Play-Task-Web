import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

import { CreatePasswordComponent } from '../create-password/create-password.component';

interface InstitutionResponse {
  institutionId: string;
}

@Component({
  selector: 'app-institution-registration-form',
  templateUrl: './institution-registration-form.component.html',
  styleUrls: ['./institution-registration-form.component.css'],
})
export class InstitutionRegistrationFormComponent {
  @ViewChild('passwordComponent')
  createPasswordComponent!: CreatePasswordComponent;

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  addPasswordError(err: string): void {
    this.registrationErrors.push(err);
  }

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

    this.createPasswordComponent.validatePassword();

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
          this.registrationForm.reset();
          this.registrationStatus.emit({
            isRegistered: true,
            id: res.institutionId,
          });
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
