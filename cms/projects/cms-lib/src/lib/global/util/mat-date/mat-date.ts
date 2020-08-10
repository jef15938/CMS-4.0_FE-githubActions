import { Injectable } from '@angular/core';
import { NativeDateAdapter, DateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';

@Injectable({
  providedIn: 'root'
})
export class CmsDateAdapter extends NativeDateAdapter {

  parse(value: string): Date | null {
    if (!value) { return null; }

    const dateTimeStringTester = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9]) (2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?$/g);
    if (dateTimeStringTester.test(value)) {
      return new Date(value);
    }

    const dateStringTester = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])?$/g);
    if (dateStringTester.test(value)) {
      const date = new Date(value);
      date.setHours(0);
      return date;
    }

    return new Date('Invalid Date');
  }

  convertDateString(dateString: string, type: 'DATE' | 'DATETIME'): string {
    const date = this.convertDateStringToDate(dateString);
    const result = date ? this.convertDateToDateString(date, type) : dateString;
    return result;
  }

  convertDateToDateString(date: Date, type: 'DATE' | 'DATETIME'): string {
    if (!date) { return null; }
    let day: string = date.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month: string = (date.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    const year = date.getFullYear();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    let result = `${year}-${month}-${day}`;
    if (type === 'DATETIME') {
      result = `${result} ${hh > 9 ? '' : '0'}${hh}:${mm > 9 ? '' : '0'}${mm}:${ss > 9 ? '' : '0'}${ss}`;
    }
    return result;
  }

  convertDateStringToDate(dateString: string): Date {
    if (!dateString) { return null; }
    if (!isNaN(+dateString)) { return new Date(+dateString * 1000); }
    const dateTimeStringTester = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][01]\d[0-5]\d)?$/g);
    if (dateTimeStringTester.test(dateString)) {
      const [date, time] = dateString.substr(0, 19).split('T');
      const [yyyy, mm, dd] = date.split('-');
      const [HH, MM, SS] = time.split(':');
      const d = new Date(`${yyyy}/${+mm}/${dd}`);
      d.setHours(+HH);
      d.setMinutes(+MM);
      d.setSeconds(+SS);
      return d;
    }
    const dateStringTester = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])/g);
    if (dateStringTester.test(dateString)) {
      const [yyyy, mm, dd] = dateString.split('-');
      return new Date(`${yyyy}/${+mm}/${dd}`);
    }
    return null;
  }

  format(date: Date, displayFormat = 'DATETIME'): string {
    if (!date) { return ''; }
    if (displayFormat === 'DATETIME') {
      return this.convertDateToDateString(date, 'DATETIME');
    }
    if (displayFormat === 'DATE') {
      return this.convertDateToDateString(date, 'DATE');
    }
    return date.toDateString();
  }

}

export const CMS_DATE_FORMATS_DATETIME: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'DATETIME',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: {
      year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

export const CMS_DATE_FORMATS_DATE: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'DATE',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: {
      year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@Injectable({
  providedIn: 'root'
})
export class CmsDateTimeAdapter extends NgxMatDateAdapter<Date> {

  constructor(private dateAdapter: DateAdapter<Date>, ) { super(); }

  parse(value: any, parseFormat: any): Date {
    return this.dateAdapter.parse(value, parseFormat);
  }

  format(date: Date, displayFormat: any): string {
    return this.dateAdapter.format(date, displayFormat);
  }

  getHour(date: Date): number {
    return date?.getHours() || 0;
  }

  getMinute(date: Date): number {
    return date?.getMinutes() || 0;
  }

  getSecond(date: Date): number {
    return date?.getSeconds() || 0;
  }

  setHour(date: Date, value: number): void {
    date.setHours(value);
  }

  setMinute(date: Date, value: number): void {
    date.setMinutes(value);
  }

  setSecond(date: Date, value: number): void {
    date.setSeconds(value);
  }

  getYear(date: Date): number {
    return this.dateAdapter.getYear(date);
  }

  getMonth(date: Date): number {
    return this.dateAdapter.getMonth(date);
  }

  getDate(date: Date): number {
    return this.dateAdapter.getDate(date);
  }

  getDayOfWeek(date: Date): number {
    return this.dateAdapter.getDayOfWeek(date);
  }

  getMonthNames(style: 'short' | 'long' | 'narrow'): string[] {
    return style === 'narrow' ?
      ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
      : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  }

  getDateNames(): string[] {
    return [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ].map(dateString => `${dateString}`);
  }

  getDayOfWeekNames(style: 'short' | 'long' | 'narrow'): string[] {
    return style === 'narrow' ?
      ['一', '二', '三', '四', '五', '六', '日']
      : ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
  }

  getYearName(date: Date): string {
    return this.dateAdapter.getYearName(date);
  }

  getFirstDayOfWeek(): number {
    return this.dateAdapter.getFirstDayOfWeek();
  }

  getNumDaysInMonth(date: Date): number {
    return this.dateAdapter.getNumDaysInMonth(date);
  }

  clone(date: Date): Date {
    return this.dateAdapter.clone(date);
  }

  createDate(year: number, month: number, date: number): Date {
    return this.dateAdapter.createDate(year, month, date);
  }

  today(): Date {
    return this.dateAdapter.today();
  }

  addCalendarYears(date: Date, years: number): Date {
    return this.dateAdapter.addCalendarYears(date, years);
  }

  addCalendarMonths(date: Date, months: number): Date {
    return this.dateAdapter.addCalendarYears(date, months);
  }

  addCalendarDays(date: Date, days: number): Date {
    return this.dateAdapter.addCalendarYears(date, days);
  }

  toIso8601(date: Date): string {
    return this.dateAdapter.toIso8601(date);
  }

  isDateInstance(obj: any): boolean {
    return this.dateAdapter.isDateInstance(obj);
  }

  isValid(date: Date): boolean {
    return this.dateAdapter.isValid(date);
  }

  invalid(): Date {
    return this.dateAdapter.invalid();
  }
}
