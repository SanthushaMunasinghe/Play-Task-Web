import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionRegistrationFormComponent } from './institution-registration-form.component';

describe('InstitutionRegistrationFormComponent', () => {
  let component: InstitutionRegistrationFormComponent;
  let fixture: ComponentFixture<InstitutionRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionRegistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
