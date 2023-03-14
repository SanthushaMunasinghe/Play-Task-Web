import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentSubjectsComponent } from './edit-student-subjects.component';

describe('EditStudentSubjectsComponent', () => {
  let component: EditStudentSubjectsComponent;
  let fixture: ComponentFixture<EditStudentSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentSubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
