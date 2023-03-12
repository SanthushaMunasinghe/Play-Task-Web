import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Institution } from 'src/app/models/current-user-model';
import { Student } from 'src/app/models/current-student-model';
import { UserSubject } from 'src/app/models/user-subject-model';

import { CurrentUserService } from 'src/app/services/current-user.service';
import { CurrentStudentServiceService } from 'src/app/services/current-student-service.service';
import { UserSubjectsService } from 'src/app/services/user-subjects.service';

interface SubjectResponse {
  _id: string;
  name: string;
  grade: string;
}

interface ClassroomResponse {
  _id: string;
  name: string;
  grade: string;
}

interface GradeResponse {
  id: string;
  number: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  studentList: Student[] = [];
  student: Student = {
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

  institutionId: string = '';

  selectedStudentIndex: number = 0;

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService,
    private currentStudentServiceService: CurrentStudentServiceService,
    private userSubjectsService: UserSubjectsService
  ) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe((inst: Institution) => {
      this.institutionId = inst.id;

      //Get Topic
      this.http
        .get<Student[]>(`/api/getstudents/${this.institutionId}`)
        .subscribe(
          (res) => {
            this.studentList = res;
            this.student = this.studentList[0];
            this.currentStudentServiceService.updateStudent(this.student);
            this.getSubjects(this.student);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  getSubjects(teacher: Student) {
    let subjects: UserSubject[] = [];
    this.userSubjectsService.updateSubjects(subjects);

    for (const subject of teacher.subjects) {
      this.http.get<SubjectResponse>(`/api/getsubject/${subject}`).subscribe(
        (res) => {
          const gotSubject = res;
          this.http
            .get<GradeResponse>(`/api/getgradebyid/${gotSubject.grade}`)
            .subscribe(
              (res) => {
                const gotGrade = res;
                subjects.push({
                  gradeId: gotGrade.id,
                  gradeNumber: gotGrade.number,
                  subjectId: gotSubject._id,
                  subjectName: gotSubject.name,
                });

                this.userSubjectsService.updateSubjects(subjects);
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
    }
  }

  onStudentSelect() {
    this.student = this.studentList[this.selectedStudentIndex];
    this.currentStudentServiceService.updateStudent(this.student);
    this.getSubjects(this.student);
  }
}
