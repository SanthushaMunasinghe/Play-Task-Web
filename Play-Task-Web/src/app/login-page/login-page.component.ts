import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  isLoggedIn: boolean = false;
  id: string = '';

  onLogin(eventData: { isLoggedIn: boolean; id: string }): void {
    this.isLoggedIn = eventData.isLoggedIn;
    this.id = eventData.id;
  }
}
