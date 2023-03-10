import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtopicInstructionsComponent } from './subtopic-instructions.component';

describe('SubtopicInstructionsComponent', () => {
  let component: SubtopicInstructionsComponent;
  let fixture: ComponentFixture<SubtopicInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtopicInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtopicInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
