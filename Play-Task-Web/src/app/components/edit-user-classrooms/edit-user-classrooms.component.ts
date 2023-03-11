import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { faCircleDot } from '@fortawesome/free-regular-svg-icons';

import { UserClassroomsService } from 'src/app/services/user-classrooms.service';

@Component({
  selector: 'app-edit-user-classrooms',
  templateUrl: './edit-user-classrooms.component.html',
  styleUrls: ['./edit-user-classrooms.component.css'],
})
export class EditUserClassroomsComponent {
  faCircleDotIcon = faCircleDot;

  addClassroomsForm = this.formBuilder.group({
    classroom: '',
  });

  classrooms: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userClassroomsService: UserClassroomsService
  ) {}

  ngOnInit() {
    this.userClassroomsService.classrooms$.subscribe((classrooms: string[]) => {
      this.classrooms = classrooms;
    });
  }

  onSubmit(): void {
    const formClassrooms = this.addClassroomsForm.value;

    if (formClassrooms.classroom) {
      this.classrooms.push(formClassrooms.classroom);

      this.userClassroomsService.updateClassrooms(this.classrooms);
      this.addClassroomsForm.reset();
    }
  }

  onRemove(inst: string): void {
    const index = this.classrooms.indexOf(inst);
    if (index !== -1) {
      this.classrooms.splice(index, 1);
    }
    this.userClassroomsService.updateClassrooms(this.classrooms);
  }
}
