import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Institution } from '../../models/current-user-model';
import { CurrentUserService } from '../../services/current-user.service';

import { Student } from 'src/app/models/current-student-model';

interface GradeResponse {
  _id: string;
  number: string;
  institution: string;
}

interface ClassroomResponse {
  _id: string;
  name: string;
  grade: string;
}

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class ClassroomListComponent {
  gradeList: GradeResponse[] = [];
  classroomList: ClassroomResponse[] = [];
  currentClassroomList: ClassroomResponse[] = [];
  currentClassroom: ClassroomResponse = {
    _id: '',
    name: '',
    grade: '',
  };
  studentList: Student[] = [];

  institutionId: string = '';

  selectedGradeIndex: number = 0;
  selectedClassroomIndex: number = 0;

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        this.institutionId = institution.id;
        //Get Grades
        this.http
          .get<GradeResponse[]>(`/api/getgrades/${this.institutionId}`)
          .subscribe(
            (res) => {
              this.gradeList = res;
              this.gradeList.sort(
                (a, b) => Number(a.number) - Number(b.number)
              );
              for (const grade of this.gradeList) {
                //Get Classrooms
                this.http
                  .get<ClassroomResponse[]>(`/api/getclassrooms/${grade._id}`)
                  .subscribe(
                    (res) => {
                      const thisList: ClassroomResponse[] = res;
                      for (const item of thisList) {
                        this.classroomList.push(item);
                      }
                      this.classroomList.sort((a, b) => {
                        if (a.name < b.name) {
                          return -1;
                        } else if (a.name > b.name) {
                          return 1;
                        } else {
                          return 0;
                        }
                      });
                      if (grade === this.gradeList[0]) {
                        this.onGradeSelect();
                      }
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    );
  }

  onGradeSelect() {
    this.currentClassroomList = [];
    const selectedGrade = this.gradeList[this.selectedGradeIndex];

    for (const classroom of this.classroomList) {
      if (classroom.grade == selectedGrade._id) {
        this.currentClassroomList.push(classroom);
      }
    }

    this.selectedClassroomIndex = 0;
    this.onClassroomSelect();
  }

  onClassroomSelect() {
    if (this.currentClassroomList.length != 0) {
      this.currentClassroom =
        this.currentClassroomList[this.selectedClassroomIndex];

      //Get Student
      this.http
        .get<Student[]>(
          `/api/getsclassroomtudents/${this.currentClassroom._id}`
        )
        .subscribe(
          (res) => {
            this.studentList = res;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
