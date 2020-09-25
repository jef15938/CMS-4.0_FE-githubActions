import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../service/calculation.service';

@Component({
  selector: 'rdr-policyloan-calculation',
  templateUrl: './policyloan-calculation.component.html',
  styleUrls: ['./policyloan-calculation.component.scss']
})
export class PolicyloanCalculationComponent implements OnInit {

  calculateResult: { otherInterest: number, ourInterest: number, saveTotal: number };
  condition = {
    loan: '',
    otherInterestRate: '',
    ourInterestRate: ''
  };

  constructor(private calculationService: CalculationService) { }

  ngOnInit(): void {
  }

  send(fromValue) {
    if (fromValue.valid) {
      console.log(fromValue.value.condition);
      const loan = parseFloat(fromValue.value.condition.loan);
      const otherInterestRate = parseFloat(fromValue.value.condition.otherInterestRate);
      const ourInterestRate = parseFloat(fromValue.value.condition.ourInterestRate);

      this.calculateResult = this.calculationService.calculatePolicyLoan(loan, otherInterestRate, ourInterestRate);
      console.log(this.calculateResult);
    }
  }

}
