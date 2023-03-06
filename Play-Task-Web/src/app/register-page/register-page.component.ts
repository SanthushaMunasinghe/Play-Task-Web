import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  isRegistered: boolean = false;
  id: string = '';

  onRegistration(eventData: { isRegistered: boolean; id: string }): void {
    this.isRegistered = eventData.isRegistered;
    this.id = eventData.id;
  }
}
