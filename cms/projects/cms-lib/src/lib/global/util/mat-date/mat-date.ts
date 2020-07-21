import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';

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

    const dateStringTester = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])?$/g)
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
      return new Date(dateString);
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
