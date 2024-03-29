import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { faCircleDot } from '@fortawesome/free-regular-svg-icons';

import { UserClassroom } from 'src/app/models/user-classroom-model';
import { UserSubject } from 'src/app/models/user-subject-model';

import { TeacherClassroomsService } from 'src/app/services/teacher-classrooms.service';

import { TeacherSubjectsService } from 'src/app/services/teacher-subjects.service';

interface GradeResponse {
  id: string;
  number: string;
}

interface ClassroomResponse {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-edit-user-classrooms',
  templateUrl: './edit-user-classrooms.component.html',
  styleUrls: ['./edit-user-classrooms.component.css'],
})
export class EditUserClassroomsComponent {
  faCircleDotIcon = faCircleDot;

  @Input() institutionId: string = '';

  addClassroomsForm = this.formBuilder.group({
    grade: '',
    classroom: '',
  });

  grade: GradeResponse = { id: '', number: '' };

  classroom: ClassroomResponse = {
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
    private userClassroomsService: TeacherClassroomsService,
    private userSubjectsService: TeacherSubjectsService
  ) {}

  ngOnInit() {
    this.userClassroomsService.classrooms$.subscribe(
      (classrooms: UserClassroom[]) => {
        this.classrooms = classrooms;
      }
    );

    this.userSubjectsService.subjects$.subscribe((subjects: UserSubject[]) => {
      this.subjects = subjects;
    });
  }

  onSubmit(): void {
    const formClassrooms = this.addClassroomsForm.value;

    if (formClassrooms.classroom && formClassrooms.grade) {
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

            const validGrade = this.subjects.some(
              (subject) => subject.gradeId === this.grade.id
            );

            if (!validGrade) {
              this.submitErrors.push(
                'Invalid Grade. Grade Must Exist In Subjects!'
              );
            }

            //Get Classroom
            this.http
              .get<ClassroomResponse>(
                `/api/getclassroom/${this.grade.id}/${formClassrooms.classroom}`
              )
              .subscribe(
                (res) => {
                  this.classroom = res;
                  for (const classroom of this.classrooms) {
                    if (classroom.classroomId == this.classroom._id) {
                      this.submitErrors.push('Classroom Already Added');
                      this.isSubmitting = false;
                      break;
                    }
                  }

                  if (this.submitErrors.length == 0) {
                    this.classrooms.push({
                      gradeId: this.grade.id,
                      gradeNumber: this.grade.number,
                      classroomId: this.classroom._id,
                      classroomName: this.classroom.name,
                    });

                    this.userClassroomsService.updateClassrooms(
                      this.classrooms
                    );

                    this.addClassroomsForm.reset();
                  }

                  this.isSubmitting = false;
                },
                (error) => {
                  this.submitErrors.push('Classroom Error');
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

  onRemove(cls: UserClassroom): void {
    const index = this.classrooms.indexOf(cls);
    if (index !== -1) {
      this.classrooms.splice(index, 1);
    }

    this.userClassroomsService.updateClassrooms(this.classrooms);
  }
}
