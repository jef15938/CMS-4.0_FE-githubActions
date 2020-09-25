import { Component, OnInit } from '@angular/core';
import { CalculationService, MonthlyCalculateResult } from '../service/calculation.service';

@Component({
  selector: 'rdr-monthly-payment-calculation',
  templateUrl: './monthly-payment-calculation.component.html',
  styleUrls: ['./monthly-payment-calculation.component.scss']
})
export class MonthlyPaymentCalculationComponent implements OnInit {

  periodList: Array<number>;
  calculateResult: { firstYear: number, secondYear: number, resultList: Array<MonthlyCalculateResult> };
  condition = {
    loan: '',
    period: 5,
    firstYearRate: '2.75',
    secondYearRate: '3.2'
  };

  constructor(private calculationService: CalculationService) { }

  ngOnInit(): void {

    this.periodList = Array.from({ length: 40 }, (v, i) => i + 1).slice(4);
  }


  send(fromValue) {
    if (fromValue.valid) {
      const loan = parseInt(fromValue.value.condition.loan, 10);
      const period = parseInt(fromValue.value.condition.period, 10);
      const firstYear = parseFloat(fromValue.value.condition.firstYearRate);
      const secondYear = parseFloat(fromValue.value.condition.secondYearRate);

      this.calculateResult = this.calculationService.calculateMonthlyPayment(loan, period, firstYear, secondYear);
    }
  }
}
