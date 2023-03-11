import { Component, Input } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Teacher } from 'src/app/models/current-teacher-model';

import { CurrentTeacherServiceService } from 'src/app/services/current-teacher-service.service';

interface TeacherDiff {
  [key: string]: string | string[];
  name: '';
  email: '';
  contactno: '';
  home: '';
}

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent {
  @Input() institutionId: string = '';

  currentTeacher: Teacher = {
    _id: '',
    name: '',
    email: '',
    contactno: '',
    home: '',
    institution: '',
    subjects: [],
    classrooms: [],
    dp: '',
  };

  editTeacherForm: FormGroup = this.formBuilder.group({
    name: '',
    email: '',
    contactno: '',
    home: '',
  });

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private currentTeacherServiceService: CurrentTeacherServiceService
  ) {}

  ngOnInit() {
    this.currentTeacherServiceService.teacher$.subscribe((teacher: Teacher) => {
      this.currentTeacher = teacher;
      this.editTeacherForm = this.formBuilder.group({
        name: [this.currentTeacher.name],
        email: [this.currentTeacher.email],
        contactno: [this.currentTeacher.contactno],
        home: [this.currentTeacher.home],
      });
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formTeacher = this.editTeacherForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formTeacher)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const teacher: TeacherDiff = {
        name: formTeacher.name,
        email: formTeacher.email,
        contactno: formTeacher.contactno,
        home: formTeacher.home,
      };

      const updatedTeacher: TeacherDiff = {
        name: '',
        email: '',
        contactno: '',
        home: '',
      };

      for (const key in teacher) {
        if (this.currentTeacher[key] != teacher[key]) {
          updatedTeacher[key] = teacher[key];
        }
      }

      console.log(updatedTeacher);
      this.http
        .put(
          `/api/updateteacher/${this.institutionId}/${this.currentTeacher._id}`,
          updatedTeacher
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
