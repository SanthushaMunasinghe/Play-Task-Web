import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubtopicInstructionsComponent } from './edit-subtopic-instructions.component';

describe('EditSubtopicInstructionsComponent', () => {
  let component: EditSubtopicInstructionsComponent;
  let fixture: ComponentFixture<EditSubtopicInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubtopicInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubtopicInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
