import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Institution } from '../../models/current-user-model';
import { CurrentUserService } from '../../services/current-user.service';

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

  selectedIndex: number = 0;

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        const institutionId = institution.id;
        //Get Grades
        this.http
          .get<GradeResponse[]>(`/api/getgrades/${institutionId}`)
          .subscribe(
            (res) => {
              this.gradeList = res;
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
    const selectedGrade = this.gradeList[this.selectedIndex];

    for (const classroom of this.classroomList) {
      if (classroom.grade == selectedGrade._id) {
        this.currentClassroomList.push(classroom);
      }
    }
  }
}
