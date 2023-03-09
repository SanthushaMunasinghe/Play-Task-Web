import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface GradeResponse {
  gradeId: string;
}

@Component({
  selector: 'app-add-grades-form',
  templateUrl: './add-grades-form.component.html',
  styleUrls: ['./add-grades-form.component.css'],
})
export class AddGradesFormComponent {
  @Input() institutionId: string = '';

  addGradesForm = this.formBuilder.group({
    number: '',
    termsCount: '',
  });

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    this.isSubmitting = true;

    const formGrades = this.addGradesForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formGrades)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const grade = {
        number: formGrades.number,
        institution: this.institutionId,
      };

      this.http.post<GradeResponse>('/api/grades', grade).subscribe(
        (res) => {
          const gradeId = res.gradeId;

          console.log(gradeId);
          const count = formGrades.termsCount
            ? Number(formGrades.termsCount)
            : 0;

          for (let i = 0; i < count; i++) {
            const term = { number: String(i + 1), grade: gradeId };
            this.http.post('/api/terms', term).subscribe(
              (res) => {
                this.isSubmitting = false;
                window.location.reload();
              },
              (error) => {
                this.submitErrors.push(error.error.message);
                this.isSubmitting = false;
              }
            );
          }
        },
        (error) => {
          this.submitErrors.push(error.error.message);
          this.isSubmitting = false;
        }
      );
    }
  }
}
