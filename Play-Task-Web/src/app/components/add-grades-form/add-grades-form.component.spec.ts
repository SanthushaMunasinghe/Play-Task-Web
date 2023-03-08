import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradesFormComponent } from './add-grades-form.component';

describe('AddGradesFormComponent', () => {
  let component: AddGradesFormComponent;
  let fixture: ComponentFixture<AddGradesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGradesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGradesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
