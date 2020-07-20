import { Pipe, PipeTransform } from '@angular/core';
import { CmsDateAdapter } from '../util/mat-date/mat-date';

@Pipe({
  name: 'dateStringFormat'
})
export class DateStringFormatPipe implements PipeTransform {

  constructor(
    private cmsDateAdapter: CmsDateAdapter,
  ) { }

  transform(value: string, type: 'DATE' | 'DATETIME'): string {
    if (value) {
      return this.cmsDateAdapter.convertDateToDateString(this.cmsDateAdapter.convertDateStringToDate(value), type);
    } else {
      return '';
    }
  }

}
