import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassroomsFormComponent } from './add-classrooms-form.component';

describe('AddClassroomsFormComponent', () => {
  let component: AddClassroomsFormComponent;
  let fixture: ComponentFixture<AddClassroomsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClassroomsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassroomsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
