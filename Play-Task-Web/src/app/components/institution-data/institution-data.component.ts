import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CurrentInstitution } from 'src/app/models/current-institution-model';
import { Institution } from 'src/app/models/current-user-model';

import { CurrentUserService } from 'src/app/services/current-user.service';
import { CurrentInstitutionService } from 'src/app/services/current-institution.service';

interface InstitutionDiff {
  [key: string]: string;
  name: string;
  email: string;
  contactno: string;
  location: string;
}

@Component({
  selector: 'app-institution-data',
  templateUrl: './institution-data.component.html',
  styleUrls: ['./institution-data.component.css'],
})
export class InstitutionDataComponent {
  institution: CurrentInstitution = {
    _id: '',
    name: '',
    type: '',
    email: '',
    contactno: '',
    location: '',
  };

  institutionId: string = '';

  editInstitutionForm: FormGroup = this.formBuilder.group({
    name: '',
    email: '',
    contactno: '',
    location: '',
  });

  isSubmitting: boolean = false;

  submitErrors: string[] = [''];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private currentUserService: CurrentUserService,
    private currentInstitutionService: CurrentInstitutionService
  ) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe((inst: Institution) => {
      this.institutionId = inst.id;
      //Get Institution
      this.http
        .get<CurrentInstitution>(`/api/institution/${this.institutionId}/data`)
        .subscribe(
          (res) => {
            this.institution = res;
            this.currentInstitutionService.updateCurrentInstitution(
              this.institution
            );
          },
          (error) => {
            console.log(error);
          }
        );
    });

    this.currentInstitutionService.institution$.subscribe(
      (inst: CurrentInstitution) => {
        this.institution = inst;
        this.editInstitutionForm = this.formBuilder.group({
          name: [this.institution.name],
          email: [this.institution.email],
          contactno: [this.institution.contactno],
          location: [this.institution.location],
        });
      }
    );
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formInstitution = this.editInstitutionForm.value;
    this.submitErrors = [];

    for (let value of Object.values(formInstitution)) {
      if (value == '') {
        this.submitErrors.push('Fill All Fields!');
        this.isSubmitting = false;
        break;
      }
    }

    if (this.submitErrors.length == 0) {
      const inst: InstitutionDiff = {
        name: formInstitution.name,
        email: formInstitution.email,
        contactno: formInstitution.contactno,
        location: formInstitution.location,
      };

      const updatedInst: InstitutionDiff = {
        name: '',
        email: '',
        contactno: '',
        location: '',
      };

      for (const key in inst) {
        if (this.institution[key] != inst[key]) {
          updatedInst[key] = inst[key];
        }
      }

      console.log(updatedInst);
      this.http
        .put(`/api/updateinstitution/${this.institutionId}`, updatedInst)
        .subscribe(
          (res) => {
            console.log(res);
            this.isSubmitting = false;
            window.location.reload();
          },
          (error) => {
            this.submitErrors.push(error.error.message);
            this.isSubmitting = false;
          }
        );
    }
  }
}
