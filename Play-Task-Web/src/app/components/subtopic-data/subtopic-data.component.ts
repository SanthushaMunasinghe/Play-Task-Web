import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Topic } from 'src/app/models/current-topic-model';

import { CurrentTopicService } from '../../services/current-topic.service';

interface SubtopicResponse {
  _id: string;
  title: string;
  topic: string;
  description: string;
  instructions: string[];
}

@Component({
  selector: 'app-subtopic-data',
  templateUrl: './subtopic-data.component.html',
  styleUrls: ['./subtopic-data.component.css'],
})
export class SubtopicDataComponent {
  subtopicList: SubtopicResponse[] = [];
  subtopic: SubtopicResponse = {
    _id: '',
    title: '',
    topic: '',
    description: '',
    instructions: [],
  };

  topicId: string = '';

  selectedTopicIndex: number = 0;

  constructor(
    private http: HttpClient,
    private currentTopicService: CurrentTopicService
  ) {}

  ngOnInit() {
    this.currentTopicService.topic$.subscribe((topic: Topic) => {
      this.topicId = topic._id;

      //Get Topic
      this.http
        .get<SubtopicResponse[]>(`/api/getsubtopics/${this.topicId}`)
        .subscribe(
          (res) => {
            this.subtopicList = res;
            this.subtopic = this.subtopicList[0];
            console.log(this.subtopicList);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  onTopicSelect() {
    this.subtopic = this.subtopicList[this.selectedTopicIndex];
    console.log(this.subtopic);
  }

  onClick() {}
}
