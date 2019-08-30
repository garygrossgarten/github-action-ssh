import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangePage } from './password-change.page';

describe('PasswordChangePage', () => {
  let component: PasswordChangePage;
  let fixture: ComponentFixture<PasswordChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordChangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
