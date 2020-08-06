import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo } from '../../../../global/model';
import { CmsFarmTableDataAction } from '../../../../global/enum';

@Pipe({
  name: 'getFarmTableDataActions'
})
export class GetFarmTableDataActionsPipe implements PipeTransform {

  transform(data: CmsFarmTableDataInfo): CmsFarmTableDataAction[] {
    return data.actions;
  }

}
