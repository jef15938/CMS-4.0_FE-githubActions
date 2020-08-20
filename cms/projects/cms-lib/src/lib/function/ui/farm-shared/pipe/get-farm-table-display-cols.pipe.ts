import { Pipe, PipeTransform } from '@angular/core';
import { ACTION_COLUMN, CHECKBOX_COLUMN } from '../component/farm-table-info/farm-table-info.type';
import { FarmTableDataInfoModel } from '../../../../global/api/data-model/models/farm-table-data-info.model';
import { FarmTableInfoModel } from '../../../../global/api/data-model/models/farm-table-info.model';

@Pipe({
  name: 'getFarmTableDisplayCols'
})
export class GetFarmTableDisplayColsPipe implements PipeTransform {

  transform(tableInfo: FarmTableInfoModel): string[] {
    const datas: FarmTableDataInfoModel[] = tableInfo.datas;
    const columns = datas && datas[0] ? datas[0].columns : [];
    const displays = columns.map(c => c.displayText);
    const hasAction = datas?.some(data => {
      return data.actions?.length;
    });
    if (hasAction) {
      displays.push(ACTION_COLUMN);
    }
    if (tableInfo.canCheckbox) {
      displays.unshift(CHECKBOX_COLUMN);
    }
    return displays;
  }

}
