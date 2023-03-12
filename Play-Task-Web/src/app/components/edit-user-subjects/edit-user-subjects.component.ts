import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { faCircleDot } from '@fortawesome/free-regular-svg-icons';

import { UserSubject } from 'src/app/models/user-subject-model';
import { UserClassroom } from 'src/app/models/user-classroom-model';

import { UserSubjectsService } from 'src/app/services/user-subjects.service';
import { UserClassroomsService } from 'src/app/services/user-classrooms.service';

interface GradeResponse {
  _id: string;
  number: string;
}

interface SubjectResponse {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-edit-user-subjects',
  templateUrl: './edit-user-subjects.component.html',
  styleUrls: ['./edit-user-subjects.component.css'],
})
export class EditUserSubjectsComponent {
  faCircleDotIcon = faCircleDot;

  @Input() institutionId: string = '';

  addSubjectsForm = this.formBuilder.group({
    grade: '',
    subject: '',
  });

  grade: GradeResponse = { _id: '', number: '' };

  subject: SubjectResponse = {
    _id: '',
    name: '',
  };

  subjects: UserSubject[] = [];
  classrooms: UserClassroom[] = [];

  isSubmitting: boolean = false;

  submitErrors: string[] = [];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userSubjectsService: UserSubjectsService,
    private userClassroomsService: UserClassroomsService
  ) {}

  ngOnInit() {
    this.userSubjectsService.subjects$.subscribe((subjects: UserSubject[]) => {
      this.subjects = subjects;
    });

    this.userClassroomsService.classrooms$.subscribe(
      (classrooms: UserClassroom[]) => {
        this.classrooms = classrooms;
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
            //Get Classroom
            this.http
              .get<SubjectResponse>(
                `/api/getsubjectname/${this.grade._id}/${formClassrooms.subject}`
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
                      gradeId: this.grade._id,
                      gradeNumber: this.grade.number,
                      subjectId: this.subject._id,
                      subjectName: this.subject.name,
                    });

                    this.userSubjectsService.updateSubjects(this.subjects);

                    this.isSubmitting = false;
                    this.addSubjectsForm.reset();
                  }
                },
                (error) => {
                  this.submitErrors.push(error);
                  this.isSubmitting = false;
                }
              );
          },
          (error) => {
            this.submitErrors.push(error);
            this.isSubmitting = false;
          }
        );
    }
  }

  onRemove(subject: UserSubject): void {
    this.classrooms = this.classrooms.filter(
      (classroom) => classroom.gradeId !== subject.gradeId
    );

    this.userClassroomsService.updateClassrooms(this.classrooms);

    const index = this.subjects.indexOf(subject);
    if (index !== -1) {
      this.subjects.splice(index, 1);
    }

    this.userSubjectsService.updateSubjects(this.subjects);
  }
}
