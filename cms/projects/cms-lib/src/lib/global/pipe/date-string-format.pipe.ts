import { Pipe, PipeTransform } from '@angular/core';
import { CmsDateAdapter } from '../util/mat-date/mat-date';

@Pipe({
  name: 'dateStringFormat'
})
export class DateStringFormatPipe implements PipeTransform {

  constructor(
    private cmsDateAdapter: CmsDateAdapter,
  ) { }

  transform(value: string, type: 'DATE' | 'DATETIME', pass?: (value) => boolean): string {
    if (pass && typeof (pass) === 'function' && pass(value)) { return value; }
    if (value) {
      return this.cmsDateAdapter.convertDateString(value, type);
    } else {
      return '';
    }
  }

}
