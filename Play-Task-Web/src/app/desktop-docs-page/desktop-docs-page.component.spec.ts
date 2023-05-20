import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopDocsPageComponent } from './desktop-docs-page.component';

describe('DesktopDocsPageComponent', () => {
  let component: DesktopDocsPageComponent;
  let fixture: ComponentFixture<DesktopDocsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopDocsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopDocsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
