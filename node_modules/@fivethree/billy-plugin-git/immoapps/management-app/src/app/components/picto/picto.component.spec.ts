import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictoComponent } from './picto.component';

describe('PictoComponent', () => {
  let component: PictoComponent;
  let fixture: ComponentFixture<PictoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
