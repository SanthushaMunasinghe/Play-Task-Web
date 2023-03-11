import { Component, Input } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Subtopic } from 'src/app/models/current-subtopic-model';

import { SubtopicInstructionsService } from 'src/app/services/subtopic-instructions.service';
import { CurrentSubtopicServiceService } from 'src/app/services/current-subtopic-service.service';

interface SubtopicDiff {
  [key: string]: string | string[];
  title: string;
  description: string;
  instructions: string[];
}

@Component({
  selector: 'app-subtopic',
  templateUrl: './subtopic.component.html',
  styleUrls: ['./subtopic.component.css'],
})
export class SubtopicComponent {
  @Input() topicId: string = '';

  currentSubtopic: Subtopic = {
    _id: '',
    title: '',
    topic: '',
    description: '',
    instructions: [],
  };

  editSubtopicsForm: FormGroup = this.formBuilder.group({
    title: '',
    description: '',
  });

  instructions: string[] = [];

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private subtopicInstructionsService: SubtopicInstructionsService,
    private currentSubtopicServiceService: CurrentSubtopicServiceService
  ) {}

  ngOnInit() {
    this.currentSubtopicServiceService.subtopic$.subscribe((subt: Subtopic) => {
      this.currentSubtopic = subt;
      this.editSubtopicsForm = this.formBuilder.group({
        title: [this.currentSubtopic.title],
        description: [this.currentSubtopic.description],
      });
    });

    this.subtopicInstructionsService.getInstructions$.subscribe(
      (instructions: string[]) => {
        this.instructions = instructions;
      }
    );
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formSubtopics = this.editSubtopicsForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formSubtopics)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const subtopic: SubtopicDiff = {
        title: formSubtopics.title,
        description: formSubtopics.description,
        instructions: this.instructions,
      };

      if (subtopic['title'] == this.currentSubtopic['title']) {
        subtopic['title'] = '';
      }

      this.http
        .put(
          `/api/updatesubtopic/${this.topicId}/${this.currentSubtopic._id}`,
          subtopic
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.isSubmitting = false;
            window.location.reload();
          },
          (error) => {
            this.submitErrors.push(error.error.message);
            this.isSubmitting = false;
          }
        );
    }
  }
}
