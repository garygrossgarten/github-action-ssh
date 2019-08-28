import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPage } from './property.page';

describe('PropertyPage', () => {
  let component: PropertyPage;
  let fixture: ComponentFixture<PropertyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
