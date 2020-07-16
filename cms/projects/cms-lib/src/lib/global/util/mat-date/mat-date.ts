import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';

@Injectable()
export class CmsDateAdapter extends NativeDateAdapter {

  // parse(value: any): Date | null {
  //   console.warn('CmsDateAdapter parse()');
  //   console.warn('    value = ', value);

  //   if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
  //     const str = value.split('/');

  //     const year = Number(str[2]);
  //     const month = Number(str[1]) - 1;
  //     const date = Number(str[0]);

  //     return new Date(year, month, date);
  //   }
  //   const timestamp = typeof value === 'number' ? value : Date.parse(value);
  //   return isNaN(timestamp) ? null : new Date(timestamp);
  // }

  format(date: Date, displayFormat = 'input'): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      const year = date.getFullYear();
      const hh = date.getHours();
      const mm = date.getMinutes();
      return `${year}-${month}-${day} ${hh > 9 ? '' : '0'}${hh}:${mm > 9 ? '' : '0'}${mm}`;
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
