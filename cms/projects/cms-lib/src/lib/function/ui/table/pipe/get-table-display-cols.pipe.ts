import { Pipe, PipeTransform } from '@angular/core';
import { ColDef } from '../table.interface';

@Pipe({
  name: 'getTableDisplayCols'
})
export class GetTableDisplayColsPipe implements PipeTransform {

  transform(colDefs: ColDef<any>[], checkbox: boolean): string[] {
    const cols = colDefs ? colDefs.map(c => c.colId) : [];
    if (checkbox) { cols.unshift('checkbox'); }
    return cols;
  }

}
