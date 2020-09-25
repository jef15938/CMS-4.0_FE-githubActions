import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyloanCalculationComponent } from './policyloan-calculation.component';

describe('PolicyloanCalculationComponent', () => {
  let component: PolicyloanCalculationComponent;
  let fixture: ComponentFixture<PolicyloanCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyloanCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyloanCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
