import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmCustomFormControlComponent } from './farm-custom-form-control.component';

describe('FarmCustomFormControlComponent', () => {
  let component: FarmCustomFormControlComponent;
  let fixture: ComponentFixture<FarmCustomFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmCustomFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmCustomFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
