import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Institution } from 'src/app/models/current-user-model';
import { Teacher } from 'src/app/models/current-teacher-model';
import { UserSubject } from 'src/app/models/user-subject-model';
import { UserClassroom } from 'src/app/models/user-classroom-model';

import { CurrentUserService } from 'src/app/services/current-user.service';
import { CurrentTeacherServiceService } from 'src/app/services/current-teacher-service.service';
import { UserSubjectsService } from 'src/app/services/user-subjects.service';
import { UserClassroomsService } from 'src/app/services/user-classrooms.service';

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
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css'],
})
export class TeachersListComponent {
  teacherList: Teacher[] = [];
  teacher: Teacher = {
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

  institutionId: string = '';

  selectedTeacherIndex: number = 0;

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService,
    private currentTeacherServiceService: CurrentTeacherServiceService,
    private userSubjectsService: UserSubjectsService,
    private userClassroomsService: UserClassroomsService
  ) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe((inst: Institution) => {
      this.institutionId = inst.id;

      //Get Topic
      this.http
        .get<Teacher[]>(`/api/getteachers/${this.institutionId}`)
        .subscribe(
          (res) => {
            this.teacherList = res;
            this.teacher = this.teacherList[0];
            this.currentTeacherServiceService.updateTeacher(this.teacher);
            this.getSubjects(this.teacher);
            this.getClassrooms(this.teacher);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  getSubjects(teacher: Teacher) {
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

  getClassrooms(teacher: Teacher) {
    let classrooms: UserClassroom[] = [];
    this.userClassroomsService.updateClassrooms(classrooms);

    for (const classroom of teacher.classrooms) {
      this.http
        .get<ClassroomResponse>(`/api/getclassroombyid/${classroom}`)
        .subscribe(
          (res) => {
            const gotClassroom = res;
            this.http
              .get<GradeResponse>(`/api/getgradebyid/${gotClassroom.grade}`)
              .subscribe(
                (res) => {
                  const gotGrade = res;
                  classrooms.push({
                    gradeId: gotGrade.id,
                    gradeNumber: gotGrade.number,
                    classroomId: gotClassroom._id,
                    classroomName: gotClassroom.name,
                  });

                  this.userClassroomsService.updateClassrooms(classrooms);
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

  onTeacherSelect() {
    this.teacher = this.teacherList[this.selectedTeacherIndex];
    this.currentTeacherServiceService.updateTeacher(this.teacher);
    this.getSubjects(this.teacher);
    this.getClassrooms(this.teacher);
  }
}
