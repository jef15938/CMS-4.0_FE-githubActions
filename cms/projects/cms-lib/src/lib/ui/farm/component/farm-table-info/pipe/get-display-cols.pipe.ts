import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo } from './../../../../../type';
import { ACTION_COLUMN } from '../farm-table-info.type';

@Pipe({
  name: 'getDisplayCols'
})
export class GetDisplayColsPipe implements PipeTransform {

  transform(datas: CmsFarmTableDataInfo[]): string[] {
    const columns = datas && datas[0] ? datas[0].columns : [];
    const displays = columns.map(c => c.display_text);
    const hasAction = datas?.some(data => {
      return data.columns?.some(column => column.actions?.length);
    });
    if (hasAction) {
      displays.push(ACTION_COLUMN);
    }
    return displays;
  }

}
