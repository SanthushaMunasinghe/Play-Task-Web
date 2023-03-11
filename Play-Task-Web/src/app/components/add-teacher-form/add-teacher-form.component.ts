import { Component, Input, ViewChild } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CreatePasswordComponent } from '../create-password/create-password.component';

@Component({
  selector: 'app-add-teacher-form',
  templateUrl: './add-teacher-form.component.html',
  styleUrls: ['./add-teacher-form.component.css'],
})
export class AddTeacherFormComponent {
  @ViewChild('passwordComponent')
  createPasswordComponent!: CreatePasswordComponent;

  @Input() institutionId: string = '';

  addTeacherForm = this.formBuilder.group({
    name: '',
    email: '',
    contactno: '',
    home: '',
    password: '',
    confirmedPassword: '',
  });

  isSubmitting: boolean = false;

  registrationErrors: string[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  addPasswordError(err: string): void {
    this.registrationErrors.push(err);
  }

  onSubmit(): void {
    const formTeacher = this.addTeacherForm.value;
    this.registrationErrors = [];

    for (let value of Object.values(formTeacher)) {
      if (value == '') {
        this.registrationErrors.push('Fill All Fields!');
        break;
      }
    }

    this.createPasswordComponent.validatePassword();

    const numberPattern = /^[0-9]{10}$/;

    if (formTeacher.contactno && !numberPattern.test(formTeacher.contactno)) {
      this.registrationErrors.push('Invalid Contact No');
    }

    if (this.registrationErrors.length == 0) {
      this.isSubmitting = true;
      const teacher = {
        name: formTeacher.name,
        email: formTeacher.email,
        contactno: formTeacher.contactno,
        home: formTeacher.home,
        dp: '',
        subjects: [],
        classrooms: [],
        institution: this.institutionId,
        password: formTeacher.password,
      };
      console.log(teacher);
      this.http.post('/api/teachers', teacher).subscribe(
        (res) => {
          this.addTeacherForm.reset();
          window.location.reload();
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
