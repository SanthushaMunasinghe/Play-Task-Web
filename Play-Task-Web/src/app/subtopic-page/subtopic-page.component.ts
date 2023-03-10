import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Institution, Admin } from '../models/current-user-model';
import { Topic } from '../models/current-topic-model';

import { CurrentUserService } from '../services/current-user.service';
import { CurrentTopicService } from '../services/current-topic.service';

@Component({
  selector: 'app-subtopic-page',
  templateUrl: './subtopic-page.component.html',
  styleUrls: ['./subtopic-page.component.css'],
})
export class SubtopicPageComponent {
  institutionId: string = '';
  adminAuth: string = '';
  topicId: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private currentUserService: CurrentUserService,
    private currentTopicService: CurrentTopicService
  ) {}

  ngOnInit() {
    const topicId = this.route.snapshot.paramMap.get('topicid');

    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        this.institutionId = institution.id;
      }
    );

    this.currentUserService.admin$.subscribe((admin: Admin) => {
      this.adminAuth = admin.authorization;
    });

    this.currentTopicService.topic$.subscribe((topic: Topic) => {
      this.topicId = topic._id;
    });

    //Get Topic
    this.http.get<Topic>(`/api/gettopic/${topicId}`).subscribe(
      (res) => {
        this.currentTopicService.updateTopic(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
