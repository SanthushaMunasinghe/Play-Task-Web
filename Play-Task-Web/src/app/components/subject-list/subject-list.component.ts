import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Institution } from '../../models/current-user-model';
import { CurrentUserService } from '../../services/current-user.service';

interface GradeResponse {
  _id: string;
  number: string;
  institution: string;
}

interface SubjectResponse {
  _id: string;
  name: string;
  grade: string;
}

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent {
  gradeList: GradeResponse[] = [];
  subjectList: SubjectResponse[] = [];
  currentSubjectList: SubjectResponse[] = [];
  currentSubject: SubjectResponse = { _id: '', name: '', grade: '' };

  selectedGradeIndex: number = 0;
  selectedSubjectIndex: number = 0;

  institutionId: string = '';

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService,
    private router: Router,
    private route: ActivatedRoute
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
              for (const grade of this.gradeList) {
                //Get Classrooms
                this.http
                  .get<SubjectResponse[]>(`/api/getSubjects/${grade._id}`)
                  .subscribe(
                    (res) => {
                      const thisList: SubjectResponse[] = res;
                      for (const item of thisList) {
                        this.subjectList.push(item);
                      }
                      this.subjectList.sort((a, b) => {
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
    this.currentSubjectList = [];
    const selectedGrade = this.gradeList[this.selectedGradeIndex];

    for (const subject of this.subjectList) {
      if (subject.grade == selectedGrade._id) {
        this.currentSubjectList.push(subject);
      }
    }

    this.currentSubject = this.currentSubjectList[0];
  }

  onSubjectSelect() {
    this.currentSubject = this.currentSubjectList[this.selectedSubjectIndex];
    console.log(this.currentSubject);
  }

  onClick() {
    const adminId = this.route.snapshot.paramMap.get('adminid');
    this.router.navigate([
      '/topic',
      this.institutionId,
      adminId,
      this.currentSubject._id,
    ]);
  }
}
