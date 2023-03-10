import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SubtopicInstructionsService } from 'src/app/services/subtopic-instructions.service';

interface SubtopicResponse {
  subtopicId: string;
}

@Component({
  selector: 'app-add-subtopic-form',
  templateUrl: './add-subtopic-form.component.html',
  styleUrls: ['./add-subtopic-form.component.css'],
})
export class AddSubtopicFormComponent {
  @Input() topicId: string = '';

  addSubtopicsForm = this.formBuilder.group({
    title: '',
    description: '',
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

    const formSubtopics = this.addSubtopicsForm.value;
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

    if (this.submitErrors.length == 0) {
      const topic = {
        topic: this.topicId,
        title: formSubtopics.title,
        description: formSubtopics.description,
        instructions: this.instructions,
      };

      this.http.post<SubtopicResponse>('/api/subtopics', topic).subscribe(
        (res) => {
          console.log(res.subtopicId);
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
