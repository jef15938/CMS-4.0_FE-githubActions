import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStartEndTime'
})
export class GetStartEndTimePipe implements PipeTransform {

  constructor() { }

  transform(timeObj: { start_time: string, end_time: string }, args?: any): string {
    return !timeObj ? '' : [timeObj.start_time || 'unknown', timeObj.end_time || 'unknown'].join(' / ');
  }

}
