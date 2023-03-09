import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ClassroomResponse {
  classroomId: string;
}

@Component({
  selector: 'app-add-classrooms-form',
  templateUrl: './add-classrooms-form.component.html',
  styleUrls: ['./add-classrooms-form.component.css'],
})
export class AddClassroomsFormComponent {
  @Input() institutionId: string = '';

  addClassroomsForm = this.formBuilder.group({
    name: '',
    grade: '',
  });

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    this.isSubmitting = true;

    const formClassrooms = this.addClassroomsForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formClassrooms)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const classroom = {
        name: formClassrooms.name,
        grade: formClassrooms.grade,
        institution: this.institutionId,
      };

      this.http.post<ClassroomResponse>('/api/classrooms', classroom).subscribe(
        (res) => {
          console.log(res.classroomId);
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
