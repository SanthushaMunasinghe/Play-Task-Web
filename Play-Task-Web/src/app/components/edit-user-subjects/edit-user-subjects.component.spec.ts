import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSubjectsComponent } from './edit-user-subjects.component';

describe('EditUserSubjectsComponent', () => {
  let component: EditUserSubjectsComponent;
  let fixture: ComponentFixture<EditUserSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserSubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
