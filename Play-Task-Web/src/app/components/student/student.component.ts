import { Component, Input } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Student } from 'src/app/models/current-student-model';
import { UserClassroom } from 'src/app/models/user-classroom-model';
import { UserSubject } from 'src/app/models/user-subject-model';

import { CurrentStudentServiceService } from 'src/app/services/current-student-service.service';
import { UserClassroomsService } from 'src/app/services/user-classrooms.service';
import { UserSubjectsService } from 'src/app/services/user-subjects.service';

interface StudentDiff {
  [key: string]: string | string[];
  name: string;
  email: string;
  contactno: string;
  home: string;
  classroom: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent {
  @Input() institutionId: string = '';

  currentStudent: Student = {
    _id: '',
    name: '',
    email: '',
    contactno: '',
    home: '',
    institution: '',
    subjects: [],
    classroom: '',
    dp: '',
  };

  editStudentForm: FormGroup = this.formBuilder.group({
    name: '',
    email: '',
    contactno: '',
    home: '',
    classroom: '',
  });

  subjects: string[] = [];
  classrooms: string[] = [];

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private currentStudentServiceService: CurrentStudentServiceService,
    private userClassroomsService: UserClassroomsService,
    private userSubjectsService: UserSubjectsService
  ) {}

  ngOnInit() {
    this.currentStudentServiceService.student$.subscribe((teacher: Student) => {
      this.currentStudent = teacher;
      this.editStudentForm = this.formBuilder.group({
        name: [this.currentStudent.name],
        email: [this.currentStudent.email],
        contactno: [this.currentStudent.contactno],
        home: [this.currentStudent.home],
        classroom: [this.currentStudent.classroom],
      });
    });

    this.userClassroomsService.classrooms$.subscribe(
      (classrooms: UserClassroom[]) => {
        const ids: string[] = [];

        for (const item of classrooms) {
          ids.push(item.classroomId);
        }

        this.classrooms = ids;
      }
    );

    this.userSubjectsService.subjects$.subscribe((subjects: UserSubject[]) => {
      const ids: string[] = [];

      for (const item of subjects) {
        ids.push(item.subjectId);
      }

      this.subjects = ids;
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formStudent = this.editStudentForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formStudent)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const student: StudentDiff = {
        name: formStudent.name,
        email: formStudent.email,
        contactno: formStudent.contactno,
        home: formStudent.home,
        classroom: formStudent.classroom,
      };

      const updatedStudent: Student = {
        _id: '',
        name: '',
        email: '',
        contactno: '',
        home: '',
        institution: '',
        subjects: this.subjects,
        classroom: '',
        dp: '',
      };

      for (const key in student) {
        if (this.currentStudent[key] != student[key]) {
          updatedStudent[key] = student[key];
        }
      }

      this.http
        .put(
          `/api/updateteacher/${this.institutionId}/${this.currentStudent._id}`,
          updatedStudent
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
