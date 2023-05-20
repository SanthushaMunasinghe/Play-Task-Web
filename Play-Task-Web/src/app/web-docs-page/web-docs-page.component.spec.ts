import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDocsPageComponent } from './web-docs-page.component';

describe('WebDocsPageComponent', () => {
  let component: WebDocsPageComponent;
  let fixture: ComponentFixture<WebDocsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebDocsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebDocsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
