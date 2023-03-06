import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionLoginFormComponent } from './institution-login-form.component';

describe('InstitutionLoginFormComponent', () => {
  let component: InstitutionLoginFormComponent;
  let fixture: ComponentFixture<InstitutionLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionLoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
