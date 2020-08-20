import { Pipe, PipeTransform } from '@angular/core';
import { FarmTableDataInfoModel, FarmTableDataInfoAction } from '../../../../global/api/data-model/models/farm-table-data-info.model';

@Pipe({
  name: 'getFarmTableDataActions'
})
export class GetFarmTableDataActionsPipe implements PipeTransform {

  transform(data: FarmTableDataInfoModel): FarmTableDataInfoAction[] {
    return data.actions;
  }

}
