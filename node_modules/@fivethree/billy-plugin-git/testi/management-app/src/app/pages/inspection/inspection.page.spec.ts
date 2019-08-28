import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionPage } from './inspection.page';

describe('InspectionPage', () => {
  let component: InspectionPage;
  let fixture: ComponentFixture<InspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
