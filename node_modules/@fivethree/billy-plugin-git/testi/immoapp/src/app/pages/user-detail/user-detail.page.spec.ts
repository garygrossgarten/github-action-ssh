import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailPage } from './user-detail.page';

describe('UserDetailPage', () => {
  let component: UserDetailPage;
  let fixture: ComponentFixture<UserDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
