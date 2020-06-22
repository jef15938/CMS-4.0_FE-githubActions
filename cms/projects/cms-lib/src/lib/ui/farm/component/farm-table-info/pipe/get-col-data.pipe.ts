import { Pipe, PipeTransform } from '@angular/core';
import { CmsFarmTableDataInfo, CmsFarmTableDataColumn } from '@cms-lib/type';

@Pipe({
  name: 'getColData'
})
export class GetColDataPipe implements PipeTransform {

  transform(data: CmsFarmTableDataInfo, col: string): CmsFarmTableDataColumn {
    return data.columns.find(c => c.display_text === col);
  }

}
