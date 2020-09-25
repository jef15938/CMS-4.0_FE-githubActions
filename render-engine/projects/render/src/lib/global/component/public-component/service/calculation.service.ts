import { Injectable } from '@angular/core';

export class MonthlyCalculateResult {

  constructor(
    /** 應還利息 */
    public interest: number,
    /** 應還本金 */
    public capital: number,
    /** 每月應繳金額 */
    public monthlyAmt: number,
    /** 本金餘額 */
    public loan: number
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  private accMul(arg1, arg2) {
    let m = 0;
    const s1 = arg1.toString();
    const s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) { }
    try {
      m += s2.split('.')[1].length;
    } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  }

  private accDiv(arg1, arg2) {
    let t1 = 0;
    let t2 = 0;
    let r1;
    let r2;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) { }
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) { }

    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));

    return (r1 / r2) * Math.pow(10, t2 - t1);
  }

  /**
   * 月付金試算
   *
   * @param {number} loan 貸款金額
   * @param {number} period 年期
   * @param {number} firstYearRate 首年年利率
   * @param {number} secondYearRate 第二年起年利率
   * @memberof CalculationService
   */
  calculateMonthlyPayment(loan: number, period: number, firstYearRate: number, secondYearRate: number)
    : { firstYear: number, secondYear: number, resultList: Array<MonthlyCalculateResult> } {
    const result = [];
    let _loan = this.accMul(10000, loan);
    let _period = this.accMul(12, period);
    const _firstYearRate = this.accDiv(firstYearRate, 100);
    const _secondYearRate = this.accDiv(secondYearRate, 100);

    /** 一年幾個月 */
    const monthsInYear = 12;
    /** 總共顯示幾個月 */
    const maxDisplayMonths = 24;

    // 首年
    let payable1;
    // 第二年
    let payable2;

    /** 開始計算所有月份 */
    for (let i = 0; i < maxDisplayMonths; i++) {
      let capital;
      let monthlyAmt;
      let interest;

      if (i + 1 === 1) {
        payable1 = this.getMonthlyAmount(_loan, _period, _firstYearRate);
      }

      if (i + 1 === monthsInYear + 1) {
        payable2 = this.getMonthlyAmount(_loan, _period, _secondYearRate);
      }

      if (i < monthsInYear) {
        /** 前12個月每月應繳金額 */
        const firstYear = this.accDiv(_firstYearRate, 12);
        monthlyAmt = payable1;
        interest = this.accMul(firstYear, _loan);
      } else {
        /** 第13個月到24月每月應繳金額 */
        const secondYear = this.accDiv(_secondYearRate, 12);
        monthlyAmt = payable2;
        interest = this.accMul(secondYear, _loan);
      }

      capital = monthlyAmt - interest;
      /** 減去剩餘金額 */
      _loan -= capital;
      /** 期數減一 */
      _period--;

      result.push(new MonthlyCalculateResult(Math.round(interest), Math.round(capital), Math.round(monthlyAmt), Math.round(_loan)));
    }

    return {
      firstYear: Math.round(payable1),
      secondYear: Math.round(payable2),
      resultList: result
    };
  }

  /**
   * 取得每月應繳金額
   *
   * @private
   * @param {number} loan
   * @param {number} period
   * @param {number} yearRate
   * @returns {number}
   * @memberof CalculationService
   */
  private getMonthlyAmount(loan: number, period: number, yearRate: number): number {
    let payable: number;
    const year = this.accDiv(yearRate, 12);
    const rate = Math.pow((1 + year), period);
    payable = this.accMul(rate, loan);
    payable = this.accMul(this.accDiv(year, rate - 1), payable);
    return payable;
  }

  /**
   * 保單借款利率試算
   *
   * @param {number} loan 貸款金額
   * @param {number} otherInterestRate 信用卡循環利率或小額信貸借款利率
   * @param {number} ourInterestRate 本公司的保單借款利率
   * @returns {{ otherInterest: number, ourInterest: number, saveTotal: number}}
   * @memberof CalculationService
   */
  calculatePolicyLoan(loan: number, otherInterestRate: number, ourInterestRate: number)
    : { otherInterest: number, ourInterest: number, saveTotal: number } {
    const otherInterest = loan * (otherInterestRate / 100);
    const ourInterest = loan * (ourInterestRate / 100);
    const saveTotal = Math.round(otherInterest - ourInterest);

    if (loan === 0 || otherInterest === 0 || ourInterest === 0 ||
      !isFinite(loan) || !isFinite(otherInterest) || !isFinite(ourInterest)) {
      return;
    }

    return {
      otherInterest: Math.round(otherInterest),
      ourInterest: Math.round(ourInterest),
      saveTotal
    };
  }


}
