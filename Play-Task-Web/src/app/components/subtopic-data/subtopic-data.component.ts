import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Topic } from 'src/app/models/current-topic-model';

import { Subtopic } from 'src/app/models/current-subtopic-model';

import { CurrentTopicService } from '../../services/current-topic.service';
import { CurrentSubtopicServiceService } from 'src/app/services/current-subtopic-service.service';
import { SubtopicInstructionsService } from 'src/app/services/subtopic-instructions.service';

@Component({
  selector: 'app-subtopic-data',
  templateUrl: './subtopic-data.component.html',
  styleUrls: ['./subtopic-data.component.css'],
})
export class SubtopicDataComponent {
  subtopicList: Subtopic[] = [];
  subtopic: Subtopic = {
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
    private currentTopicService: CurrentTopicService,
    private subtopicInstructionsService: SubtopicInstructionsService,
    private currentSubtopicServiceService: CurrentSubtopicServiceService
  ) {}

  ngOnInit() {
    this.currentTopicService.topic$.subscribe((topic: Topic) => {
      this.topicId = topic._id;

      //Get Topic
      this.http.get<Subtopic[]>(`/api/getsubtopics/${this.topicId}`).subscribe(
        (res) => {
          this.subtopicList = res;
          this.subtopic = this.subtopicList[0];
          this.currentSubtopicServiceService.updateSubtopic(this.subtopic);
          this.subtopicInstructionsService.updateInstructions(
            this.subtopic.instructions
          );
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onTopicSelect() {
    this.subtopic = this.subtopicList[this.selectedTopicIndex];
    this.currentSubtopicServiceService.updateSubtopic(this.subtopic);
    this.subtopicInstructionsService.updateInstructions(
      this.subtopic.instructions
    );
  }

  onClick() {}
}
