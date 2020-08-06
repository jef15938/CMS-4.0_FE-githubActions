import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo, CmsFarmTableDataColumn } from './../../../../global/model';

@Pipe({
  name: 'getFarmTableColData'
})
export class GetFarmTableColDataPipe implements PipeTransform {

  transform(data: CmsFarmTableDataInfo, col: string): CmsFarmTableDataColumn {
    return data.columns.find(c => c.display_text === col);
  }

}
