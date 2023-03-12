import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionDataComponent } from './institution-data.component';

describe('InstitutionDataComponent', () => {
  let component: InstitutionDataComponent;
  let fixture: ComponentFixture<InstitutionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
