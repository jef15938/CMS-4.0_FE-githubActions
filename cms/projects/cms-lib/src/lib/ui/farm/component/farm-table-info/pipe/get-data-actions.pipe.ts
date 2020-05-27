import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo } from 'projects/cms-lib/src/lib/type/farm.class';
import { CmsFarmTableDataAction } from 'projects/cms-lib/src/lib/type/farm.enum';

@Pipe({
  name: 'getDataActions'
})
export class GetDataActionsPipe implements PipeTransform {

  transform(data: CmsFarmTableDataInfo): CmsFarmTableDataAction[] {
    return data.columns[0].actions;
  }

}
