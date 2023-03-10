import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtopicPageComponent } from './subtopic-page.component';

describe('SubtopicPageComponent', () => {
  let component: SubtopicPageComponent;
  let fixture: ComponentFixture<SubtopicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtopicPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtopicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
