import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPage } from './check.page';

describe('CheckPage', () => {
  let component: CheckPage;
  let fixture: ComponentFixture<CheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
