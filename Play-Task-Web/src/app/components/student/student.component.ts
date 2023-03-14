import { Component, Input } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Student } from 'src/app/models/current-student-model';
import { UserSubject } from 'src/app/models/user-subject-model';
import { UserClassroom } from 'src/app/models/user-classroom-model';

import { CurrentStudentServiceService } from 'src/app/services/current-student-service.service';
import { StudentSubjectsService } from 'src/app/services/student-subjects.service';

interface ClassroomResponse {
  _id: string;
  name: string;
  grade: string;
}

interface GradeResponse {
  id: string;
  number: string;
  institution: string;
}

interface StudentDiff {
  [key: string]: string | string[];
  name: string;
  email: string;
  contactno: string;
  home: string;
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

  currentClassroom: UserClassroom = {
    gradeId: '',
    gradeNumber: '',
    classroomId: '',
    classroomName: '',
  };

  subjects: string[] = [];

  editStudentForm: FormGroup = this.formBuilder.group({
    name: '',
    email: '',
    contactno: '',
    home: '',
    grade: '',
    classroom: '',
  });

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private currentStudentServiceService: CurrentStudentServiceService,
    private studentSubjectsService: StudentSubjectsService
  ) {}

  ngOnInit() {
    this.currentStudentServiceService.student$.subscribe((stud: Student) => {
      this.currentStudent = stud;
      this.http
        .get<ClassroomResponse>(
          `/api/getclassroombyid/${this.currentStudent.classroom}`
        )
        .subscribe(
          (res) => {
            const classroom: ClassroomResponse = res;

            this.http
              .get<GradeResponse>(`/api/getgradebyid/${classroom.grade}`)
              .subscribe(
                (res) => {
                  const grade: GradeResponse = res;

                  this.currentClassroom = {
                    gradeId: classroom.grade,
                    gradeNumber: grade.number,
                    classroomId: this.currentStudent.classroom,
                    classroomName: classroom.name,
                  };

                  this.editStudentForm = this.formBuilder.group({
                    name: [this.currentStudent.name],
                    email: [this.currentStudent.email],
                    contactno: [this.currentStudent.contactno],
                    home: [this.currentStudent.home],
                    grade: [this.currentClassroom.gradeNumber],
                    classroom: [this.currentClassroom.classroomName],
                  });
                },
                (error) => {
                  console.log(error);
                }
              );
          },
          (error) => {
            console.log(error);
          }
        );
    });

    this.studentSubjectsService.subjects$.subscribe(
      (subjects: UserSubject[]) => {
        const ids: string[] = [];

        for (const item of subjects) {
          ids.push(item.subjectId);
        }

        this.subjects = ids;
      }
    );
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
      };

      //Get Grade
      this.http
        .get<GradeResponse>(
          `/api/getgrade/${this.institutionId}/${formStudent.grade}`
        )
        .subscribe(
          (res) => {
            const grade: GradeResponse = res;

            //Get Classroom
            this.http
              .get<ClassroomResponse>(
                `/api/getclassroom/${grade.id}/${formStudent.classroom}`
              )
              .subscribe(
                (res) => {
                  const classroom: ClassroomResponse = res;

                  const updatedStudent: Student = {
                    _id: this.currentStudent._id,
                    name: '',
                    email: '',
                    contactno: '',
                    home: '',
                    institution: '',
                    subjects: this.subjects,
                    classroom: classroom._id,
                    dp: '',
                  };
                  for (const key in student) {
                    if (this.currentStudent[key] != student[key]) {
                      updatedStudent[key] = student[key];
                    }
                  }

                  console.log(updatedStudent);

                  this.http
                    .put(
                      `/api/updatestudent/${this.institutionId}/${this.currentStudent._id}`,
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
                },
                (error) => {
                  this.submitErrors.push(error);
                  this.isSubmitting = false;
                }
              );
          },
          (error) => {
            this.submitErrors.push(error);
            this.isSubmitting = false;
          }
        );
    }
  }
}
