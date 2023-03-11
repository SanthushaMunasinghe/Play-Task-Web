import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { SubjectModel } from 'src/app/models/current-subject-model';

import { CurrentSubjectService } from 'src/app/services/current-subject.service';

interface Term {
  _id: string;
  number: string;
  institution: string;
}

interface TopicResponse {
  _id: string;
  title: string;
  subject: string;
  term: string;
}

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
})
export class TopicListComponent {
  @Input() institutionId: string = '';

  termList: Term[] = [];
  topicList: TopicResponse[] = [];
  currentTopicList: TopicResponse[] = [];
  currentTopic: TopicResponse = { _id: '', title: '', subject: '', term: '' };

  selectedTermIndex: number = 0;
  selectedTopicIndex: number = 0;

  subjectId: string = '';
  gradeId: string = '';

  constructor(
    private http: HttpClient,
    private currentSubjectService: CurrentSubjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentSubjectService.subject$.subscribe((subject: SubjectModel) => {
      this.subjectId = subject._id;
      this.gradeId = subject.grade;
      //Get Terms
      this.http.get<Term[]>(`/api/getterms/${this.gradeId}`).subscribe(
        (res) => {
          this.termList = res;
          this.termList.sort((a, b) => Number(a.number) - Number(b.number));
          for (const term of this.termList) {
            //Get Topic
            this.http
              .get<TopicResponse[]>(
                `/api/gettopics/${this.subjectId}/${term._id}`
              )
              .subscribe(
                (res) => {
                  const thisList: TopicResponse[] = res;
                  for (const item of thisList) {
                    this.topicList.push(item);
                  }
                  this.topicList.sort((a, b) => {
                    if (a.title < b.title) {
                      return -1;
                    } else if (a.title > b.title) {
                      return 1;
                    } else {
                      return 0;
                    }
                  });
                  if (term === this.termList[0]) {
                    this.onTermSelect();
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
    });
  }

  onTermSelect() {
    this.currentTopicList = [];
    const selectedTerm = this.termList[this.selectedTermIndex];
    for (const topic of this.topicList) {
      if (topic.term == selectedTerm._id) {
        this.currentTopicList.push(topic);
      }
    }
    this.currentTopic = this.currentTopicList[0];
  }

  onTopicSelect() {
    this.currentTopic = this.currentTopicList[this.selectedTopicIndex];
    console.log(this.currentTopic);
  }

  onClick() {
    const adminId = this.route.snapshot.paramMap.get('adminid');
    if (this.currentTopic) {
      this.router.navigate([
        '/subtopic',
        this.institutionId,
        adminId,
        this.subjectId,
        this.currentTopic._id,
      ]);
    }
  }
}
