import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContentComponent } from './select-content.component';

describe('SelectContentComponent', () => {
  let component: SelectContentComponent;
  let fixture: ComponentFixture<SelectContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
