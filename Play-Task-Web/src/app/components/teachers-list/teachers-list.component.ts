import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Institution } from 'src/app/models/current-user-model';
import { Teacher } from 'src/app/models/current-teacher-model';

import { CurrentUserService } from 'src/app/services/current-user.service';
import { CurrentTeacherServiceService } from 'src/app/services/current-teacher-service.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css'],
})
export class TeachersListComponent {
  teacherList: Teacher[] = [];
  teacher: Teacher = {
    _id: '',
    name: '',
    email: '',
    contactno: '',
    home: '',
    institution: '',
    subjects: [],
    classrooms: [],
    dp: '',
  };

  institutionId: string = '';

  selectedTeacherIndex: number = 0;

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService,
    private currentTeacherServiceService: CurrentTeacherServiceService
  ) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe((inst: Institution) => {
      this.institutionId = inst.id;

      //Get Topic
      this.http
        .get<Teacher[]>(`/api/getteachers/${this.institutionId}`)
        .subscribe(
          (res) => {
            this.teacherList = res;
            this.teacher = this.teacherList[0];
            this.currentTeacherServiceService.updateTeacher(this.teacher);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  onTeacherSelect() {
    this.teacher = this.teacherList[this.selectedTeacherIndex];
    this.currentTeacherServiceService.updateTeacher(this.teacher);
  }
}
