import { Component, Input, ViewChild } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CreatePasswordComponent } from '../create-password/create-password.component';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css'],
})
export class AddStudentFormComponent {
  @ViewChild('passwordComponent')
  createPasswordComponent!: CreatePasswordComponent;

  @Input() institutionId: string = '';

  addStudentForm = this.formBuilder.group({
    name: '',
    email: '',
    contactno: '',
    home: '',
    grade: '',
    classroom: '',
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
    const formStudent = this.addStudentForm.value;
    this.registrationErrors = [];

    for (let value of Object.values(formStudent)) {
      if (value == '') {
        this.registrationErrors.push('Fill All Fields!');
        break;
      }
    }

    this.createPasswordComponent.validatePassword();

    const numberPattern = /^[0-9]{10}$/;

    if (formStudent.contactno && !numberPattern.test(formStudent.contactno)) {
      this.registrationErrors.push('Invalid Contact No');
    }

    if (this.registrationErrors.length == 0) {
      this.isSubmitting = true;
      const student = {
        name: formStudent.name,
        email: formStudent.email,
        contactno: formStudent.contactno,
        home: formStudent.home,
        grade: formStudent.grade,
        classroom: formStudent.classroom,
        dp: '',
        subjects: [],
        institution: this.institutionId,
        password: formStudent.password,
      };
      console.log(student);
      this.http.post('/api/students', student).subscribe(
        (res) => {
          this.addStudentForm.reset();
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
