import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SubtopicInstructionsService } from 'src/app/services/subtopic-instructions.service';

interface SubtopicResponse {
  _id: string;
  title: string;
  topic: string;
  description: string;
  instructions: string[];
}

@Component({
  selector: 'app-subtopic',
  templateUrl: './subtopic.component.html',
  styleUrls: ['./subtopic.component.css'],
})
export class SubtopicComponent {
  @Input() currentSubtopic: SubtopicResponse = {
    _id: '',
    title: '',
    topic: '',
    description: '',
    instructions: [],
  };

  editSubtopicsForm = this.formBuilder.group({
    title: this.currentSubtopic._id,
    description: this.currentSubtopic.description,
  });

  instructions: string[] = [];

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private subtopicInstructionsService: SubtopicInstructionsService
  ) {}

  onSubmit(): void {
    this.isSubmitting = true;

    const formSubtopics = this.editSubtopicsForm.value;
    this.submitErrors = [];

    this.instructions = this.subtopicInstructionsService.GetInstructions();
    console.log(this.instructions);

    for (let value of Object.values(formSubtopics)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    // if (this.submitErrors.length == 0) {
    //   const topic = {
    //     topic: this.topicId,
    //     title: formSubtopics.title,
    //     description: formSubtopics.description,
    //     instructions: this.instructions,
    //   };

    //   this.http.post<SubtopicResponse>('/api/subtopics', topic).subscribe(
    //     (res) => {
    //       console.log(res.subtopicId);
    //       this.isSubmitting = false;
    //       window.location.reload();
    //     },
    //     (error) => {
    //       this.submitErrors.push(error.error.message);
    //       this.isSubmitting = false;
    //     }
    //   );
    // }
  }
}
