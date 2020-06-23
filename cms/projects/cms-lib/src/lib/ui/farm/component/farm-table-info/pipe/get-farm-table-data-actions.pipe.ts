import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo, CmsFarmTableDataAction } from '../../../../../type';

@Pipe({
  name: 'getFarmTableDataActions'
})
export class GetFarmTableDataActionsPipe implements PipeTransform {

  transform(data: CmsFarmTableDataInfo): CmsFarmTableDataAction[] {
    return data.columns[0].actions;
  }

}
