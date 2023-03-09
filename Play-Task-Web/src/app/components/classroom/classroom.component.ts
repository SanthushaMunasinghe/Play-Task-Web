import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent {
  @Input() studentName: string = 'Santhusha Munasinghe';
  onClick() {
    console.log('clicked');
  }
}
