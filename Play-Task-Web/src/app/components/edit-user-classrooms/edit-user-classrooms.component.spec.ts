import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserClassroomsComponent } from './edit-user-classrooms.component';

describe('EditUserClassroomsComponent', () => {
  let component: EditUserClassroomsComponent;
  let fixture: ComponentFixture<EditUserClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
