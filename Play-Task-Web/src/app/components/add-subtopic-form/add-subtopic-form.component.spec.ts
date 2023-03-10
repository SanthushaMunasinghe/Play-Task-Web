import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubtopicFormComponent } from './add-subtopic-form.component';

describe('AddSubtopicFormComponent', () => {
  let component: AddSubtopicFormComponent;
  let fixture: ComponentFixture<AddSubtopicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubtopicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubtopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
