import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo, CmsFarmTableInfo } from './../../../../../../global/model';
import { ACTION_COLUMN, CHECKBOX_COLUMN } from '../farm-table-info.type';

@Pipe({
  name: 'getFarmTableDisplayCols'
})
export class GetFarmTableDisplayColsPipe implements PipeTransform {

  transform(tableInfo: CmsFarmTableInfo): string[] {
    const datas: CmsFarmTableDataInfo[] = tableInfo.datas;
    const columns = datas && datas[0] ? datas[0].columns : [];
    const displays = columns.map(c => c.display_text);
    const hasAction = datas?.some(data => {
      return data.actions?.length;
    });
    if (hasAction) {
      displays.push(ACTION_COLUMN);
    }
    if (tableInfo.can_checkbox) {
      displays.unshift(CHECKBOX_COLUMN);
    }
    return displays;
  }

}
