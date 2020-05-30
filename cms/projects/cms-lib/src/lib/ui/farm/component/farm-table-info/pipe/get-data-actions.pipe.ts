import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo } from './../../../../../type/farm.class';
import { CmsFarmTableDataAction } from './../../../../../type/farm.enum';

@Pipe({
  name: 'getDataActions'
})
export class GetDataActionsPipe implements PipeTransform {

  transform(data: CmsFarmTableDataInfo): CmsFarmTableDataAction[] {
    return data.columns[0].actions;
  }

}
