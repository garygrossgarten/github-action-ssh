import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksPage } from './checks.page';

describe('ChecksPage', () => {
  let component: ChecksPage;
  let fixture: ComponentFixture<ChecksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
