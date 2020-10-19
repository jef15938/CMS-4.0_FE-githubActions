import { Pipe, PipeTransform } from '@angular/core';
import { FarmTableDataInfoModel, FarmTableDataInfoModelColumn } from '../../../../global/api/data-model/models/farm-table-data-info.model';


@Pipe({
  name: 'getFarmTableColData'
})
export class GetFarmTableColDataPipe implements PipeTransform {

  transform(data: FarmTableDataInfoModel, col: string): FarmTableDataInfoModelColumn {
    return data.columns.find(c => c.displayText === col);
  }

}
