import { Component, Output, EventEmitter, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css'],
})
export class CreatePasswordComponent {
  faEyeIcon = faEye;
  faEyeSlashIcon = faEyeSlash;

  @Output() pushError = new EventEmitter<string>();

  @Input() parentForm: FormGroup = new FormGroup({});

  @Input() password: string | null | undefined = '';
  @Input() confirmedPassword: string | null | undefined = '';

  showPassword: boolean = false;

  validatePassword(): void {
    const passwordPattern =
      /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (this.password) {
      if (this.password.length < 8) {
        this.pushError.emit('Password Must Be 8-16 Characters');
      } else if (!passwordPattern.test(this.password)) {
        this.pushError.emit(
          'Your Password Must Contain At Least One Uppercase Letter, One Lowercase Letter, One Number, And One Special Character.'
        );
      } else if (this.password != this.confirmedPassword) {
        this.pushError.emit('Password Does Not Match!');
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
