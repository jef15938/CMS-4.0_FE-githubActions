import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class CmsDateAdapter extends NativeDateAdapter {

  // parse(value: any): Date | null {
  //   console.warn('parse()');
  //   console.warn('    value = ', value);

  //   if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
  //     const str = value.split('/');

  //     const year = Number(str[2]);
  //     const month = Number(str[1]) - 1;
  //     const date = Number(str[0]);

  //     return new Date(year, month, date);
  //   }
  //   const timestamp = typeof value === 'number' ? value : Date.parse(value);
  //   const result = isNaN(timestamp) ? null : new Date(timestamp);
  //   console.warn('    result = ', result);
  //   return result;
  // }

  convertDateString(dateString: string, type: 'DATE' | 'DATETIME'): string {

    const date = this.convertDateStringToDate(dateString);
    console.warn(dateString, type, date);
    const result = date ? this.convertDateToDateString(date, type) : dateString;
    console.warn('    result = ', result);
    return result;
  }

  convertDateToDateString(date: Date, type: 'DATE' | 'DATETIME'): string {
    if (!date) { return null; }
    console.warn('    date = ', date);
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
    console.warn('    result = ', result);
    return result;
  }

  convertDateStringToDate(dateString: string): Date {
    if (!dateString) { return null; }
    if (!isNaN(+dateString)) { return new Date(+dateString * 1000); }
    console.warn('    dateString = ', dateString);
    const dateTimeStringTester = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][01]\d[0-5]\d)?$/g);
    if (dateTimeStringTester.test(dateString)) {
      console.warn('    ', 1);
      return new Date(dateString);
    }
    const dateStringTester = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])/g);
    if (dateStringTester.test(dateString)) {
      const [yyyy, mm, dd] = dateString.split('-');
      console.warn('    ', 2);
      return new Date(`${yyyy}/${+mm}/${dd}`);
    }
    return null;
  }

  format(date: Date, displayFormat = 'input'): string {
    console.warn('format() date = ', date);
    console.warn('    date = ', date);
    if (!date) { return ''; }
    if (displayFormat === 'input') {
      return this.convertDateToDateString(date, 'DATETIME');
    }
    return date.toDateString();
  }

}

export const CMS_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: {
      year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};
