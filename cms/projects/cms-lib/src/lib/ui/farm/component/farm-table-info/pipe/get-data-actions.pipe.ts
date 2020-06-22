import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo, CmsFarmTableDataAction } from '@cms-lib/type';

@Pipe({
  name: 'getDataActions'
})
export class GetDataActionsPipe implements PipeTransform {

  transform(data: CmsFarmTableDataInfo): CmsFarmTableDataAction[] {
    return data.columns[0].actions;
  }

}
