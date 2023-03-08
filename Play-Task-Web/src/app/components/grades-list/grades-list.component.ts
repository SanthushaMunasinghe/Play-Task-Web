import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Institution } from '../../models/current-user-model';
import { CurrentUserService } from '../../services/current-user.service';

interface GradeResponse {
  _id: string;
  number: string;
  institution: string;
}

interface TermResponse {
  _id: string;
  grade: string;
  number: string;
}

interface GradeInfo {
  grade: string;
  number: number;
  termCount: number;
}

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.css'],
})
export class GradesListComponent {
  grades: GradeResponse[] = [];
  terms: TermResponse[] = [];

  gradeList: GradeInfo[] = [];

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService
  ) {}
  ngOnInit() {
    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        const institutionId = institution.id;
        //Get Grade
        this.http
          .get<GradeResponse[]>(`/api/getgrades/${institutionId}`)
          .subscribe(
            (res) => {
              this.grades = res;
              for (const grade of this.grades) {
                this.http
                  .get<TermResponse[]>(`/api/getterms/${grade._id}`)
                  .subscribe(
                    (res) => {
                      this.terms = res;
                      this.gradeList.push({
                        grade: grade._id,
                        number: Number(grade.number),
                        termCount: this.terms.length,
                      });
                      this.gradeList.sort((a, b) => a.number - b.number);
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
}
