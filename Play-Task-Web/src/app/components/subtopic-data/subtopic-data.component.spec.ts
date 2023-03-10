import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtopicDataComponent } from './subtopic-data.component';

describe('SubtopicDataComponent', () => {
  let component: SubtopicDataComponent;
  let fixture: ComponentFixture<SubtopicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtopicDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtopicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
