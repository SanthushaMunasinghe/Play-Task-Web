import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface TopicResponse {
  subjectId: string;
}

@Component({
  selector: 'app-add-topic-form',
  templateUrl: './add-topic-form.component.html',
  styleUrls: ['./add-topic-form.component.css'],
})
export class AddTopicFormComponent {
  @Input() subjectId: string = '';

  addTopicsForm = this.formBuilder.group({
    title: '',
    term: '',
  });

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    this.isSubmitting = true;

    const formTopics = this.addTopicsForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formTopics)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const topic = {
        title: formTopics.title,
        subject: this.subjectId,
        term: formTopics.term,
      };

      this.http.post<TopicResponse>('/api/topics', topic).subscribe(
        (res) => {
          console.log(res.subjectId);
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
