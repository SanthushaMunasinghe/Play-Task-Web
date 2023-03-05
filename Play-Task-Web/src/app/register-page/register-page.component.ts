import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface InstitutionResponse {
  institutionId: string;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  registrationForm = this.formBuilder.group({
    name: '',
    type: '',
    email: '',
    contactno: '',
    location: '',
    password: '',
    confirmedPassword: '',
  });

  types: string[] = ['School', 'Primary School', 'Tution'];

  registrationErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    const formInstitution = this.registrationForm.value;
    this.registrationErrors = [];

    for (let value of Object.values(formInstitution)) {
      if (value == '') {
        this.registrationErrors.push('Fill All Fields!');
        break;
      }
    }

    const passwordPattern =
      /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/;

    if (formInstitution.password) {
      if (formInstitution.password.length < 8) {
        this.registrationErrors.push('Password Must Have 8-16 Characters');
      } else if (!passwordPattern.test(formInstitution.password)) {
        this.registrationErrors.push('Weak Password!');
      } else if (
        formInstitution.password != formInstitution.confirmedPassword
      ) {
        this.registrationErrors.push('Password Does Not Match!');
      }
    }

    if (this.registrationErrors.length == 0) {
      const inst = {
        name: formInstitution.name,
        type: formInstitution.type,
        location: formInstitution.location,
        email: formInstitution.email,
        contactno: formInstitution.contactno,
        password: formInstitution.password,
      };

      this.http.post<InstitutionResponse>('/api/institutions', inst).subscribe(
        (res) => {
          console.log(res);
          this.registrationForm.reset();
          // this.router.navigate(['/dashboard', res.userId]);
          console.log(res.institutionId);
        },
        (error) => {
          this.registrationErrors.push(error.error.message);
        }
      );
    }
  }
}
