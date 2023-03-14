import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { faCircleDot } from '@fortawesome/free-regular-svg-icons';

import { UserSubject } from 'src/app/models/user-subject-model';
import { UserClassroom } from 'src/app/models/user-classroom-model';

import { StudentSubjectsService } from 'src/app/services/student-subjects.service';

interface GradeResponse {
  id: string;
  number: string;
}

interface SubjectResponse {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-edit-student-subjects',
  templateUrl: './edit-student-subjects.component.html',
  styleUrls: ['./edit-student-subjects.component.css'],
})
export class EditStudentSubjectsComponent {
  faCircleDotIcon = faCircleDot;

  @Input() institutionId: string = '';

  addSubjectsForm = this.formBuilder.group({
    grade: '',
    subject: '',
  });

  grade: GradeResponse = { id: '', number: '' };

  subject: SubjectResponse = {
    _id: '',
    name: '',
  };

  subjects: UserSubject[] = [];

  isSubmitting: boolean = false;

  submitErrors: string[] = [];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private studentSubjectService: StudentSubjectsService
  ) {}

  ngOnInit() {
    this.studentSubjectService.subjects$.subscribe(
      (subjects: UserSubject[]) => {
        this.subjects = subjects;
      }
    );
  }

  onSubmit(): void {
    const formClassrooms = this.addSubjectsForm.value;

    if (formClassrooms.subject && formClassrooms.grade) {
      this.isSubmitting = true;
      this.submitErrors = [];
      //Get Grade
      this.http
        .get<GradeResponse>(
          `/api/getgrade/${this.institutionId}/${formClassrooms.grade}`
        )
        .subscribe(
          (res) => {
            this.grade = res;
            console.log(this.grade.id);
            //Get Classroom
            this.http
              .get<SubjectResponse>(
                `/api/getsubjectname/${this.grade.id}/${formClassrooms.subject}`
              )
              .subscribe(
                (res) => {
                  this.subject = res;
                  for (const subject of this.subjects) {
                    if (subject.subjectId == this.subject._id) {
                      this.submitErrors.push('Subject Already Added');
                      this.isSubmitting = false;
                      break;
                    }
                  }

                  if (this.submitErrors.length == 0) {
                    this.subjects.push({
                      gradeId: this.grade.id,
                      gradeNumber: this.grade.number,
                      subjectId: this.subject._id,
                      subjectName: this.subject.name,
                    });

                    this.studentSubjectService.updateSubjects(this.subjects);

                    this.isSubmitting = false;
                    this.addSubjectsForm.reset();
                  }
                },
                (error) => {
                  this.submitErrors.push('Subject Error');
                  this.isSubmitting = false;
                }
              );
          },
          (error) => {
            this.submitErrors.push('Grade Error');
            this.isSubmitting = false;
          }
        );
    }
  }

  onRemove(subject: UserSubject): void {
    const index = this.subjects.indexOf(subject);
    if (index !== -1) {
      this.subjects.splice(index, 1);
    }

    this.studentSubjectService.updateSubjects(this.subjects);
  }
}
