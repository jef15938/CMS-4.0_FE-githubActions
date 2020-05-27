import { Pipe, PipeTransform } from '@angular/core';
import { ColDef } from '../table.interface';

@Pipe({
  name: 'getDisplayCols'
})
export class GetDisplayColsPipe implements PipeTransform {

  transform(colDefs: ColDef[]): string[] {
    return colDefs ? colDefs.map(c => c.colId) : [];
  }

}
