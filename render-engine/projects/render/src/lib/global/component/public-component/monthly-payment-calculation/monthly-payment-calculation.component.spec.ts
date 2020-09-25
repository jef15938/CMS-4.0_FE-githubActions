import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPaymentCalculationComponent } from './monthly-payment-calculation.component';

describe('MonthlyPaymentCalculationComponent', () => {
  let component: MonthlyPaymentCalculationComponent;
  let fixture: ComponentFixture<MonthlyPaymentCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyPaymentCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPaymentCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
