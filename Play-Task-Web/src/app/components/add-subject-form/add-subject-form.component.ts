import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface SubjectResponse {
  subjectId: string;
}

@Component({
  selector: 'app-add-subject-form',
  templateUrl: './add-subject-form.component.html',
  styleUrls: ['./add-subject-form.component.css'],
})
export class AddSubjectFormComponent {
  @Input() institutionId: string = '';

  addSubjectsForm = this.formBuilder.group({
    name: '',
    grade: '',
  });

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    this.isSubmitting = true;

    const formSubjects = this.addSubjectsForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formSubjects)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const classroom = {
        name: formSubjects.name,
        grade: formSubjects.grade,
        institution: this.institutionId,
      };

      this.http.post<SubjectResponse>('/api/subjects', classroom).subscribe(
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
