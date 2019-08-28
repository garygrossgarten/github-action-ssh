import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionResultComponent } from './inspection-result.component';

describe('InspectionResultComponent', () => {
  let component: InspectionResultComponent;
  let fixture: ComponentFixture<InspectionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
