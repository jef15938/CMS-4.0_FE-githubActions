import { Pipe, PipeTransform } from '@angular/core';
import { ColDef } from '../table.interface';

@Pipe({
  name: 'getTableDisplayCols'
})
export class GetTableDisplayColsPipe implements PipeTransform {

  transform(colDefs: ColDef[]): string[] {
    return colDefs ? colDefs.map(c => c.colId) : [];
  }

}
