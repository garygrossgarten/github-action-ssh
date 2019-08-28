import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionDetailPage } from './inspection-detail.page';

describe('InspectionDetailPage', () => {
  let component: InspectionDetailPage;
  let fixture: ComponentFixture<InspectionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
