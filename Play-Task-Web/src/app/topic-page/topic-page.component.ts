import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Institution, Admin } from '../models/current-user-model';
import { SubjectModel } from '../models/current-subject-model';

import { CurrentUserService } from '../services/current-user.service';
import { CurrentSubjectService } from '../services/current-subject.service';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css'],
})
export class TopicPageComponent {
  institutionId: string = '';
  adminAuth: string = '';
  subjectId: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private currentUserService: CurrentUserService,
    private currentSubjectService: CurrentSubjectService
  ) {}

  ngOnInit() {
    const subjectId = this.route.snapshot.paramMap.get('subjectid');

    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        this.institutionId = institution.id;
      }
    );

    this.currentUserService.admin$.subscribe((admin: Admin) => {
      this.adminAuth = admin.authorization;
    });

    this.currentSubjectService.subject$.subscribe((subject: SubjectModel) => {
      this.subjectId = subject._id;
    });

    //Get Subject
    this.http.get<SubjectModel>(`/api/getsubject/${subjectId}`).subscribe(
      (res) => {
        this.currentSubjectService.updateSubject(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
