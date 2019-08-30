import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesPage } from './properties.page';

describe('PropertiesPage', () => {
  let component: PropertiesPage;
  let fixture: ComponentFixture<PropertiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
