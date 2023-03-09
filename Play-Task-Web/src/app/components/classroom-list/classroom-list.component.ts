import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class ClassroomListComponent {
  @Input() institutionId: string = '';
}
