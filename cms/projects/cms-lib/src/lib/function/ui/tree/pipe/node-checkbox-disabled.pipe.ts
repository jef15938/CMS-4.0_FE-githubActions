import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodeCheckboxDisabled'
})
export class NodeCheckboxDisabledPipe implements PipeTransform {

  transform(data: any, checkDisabledFunction: (data) => boolean): boolean {
    if (!data || !checkDisabledFunction) { return false; }
    return checkDisabledFunction(data);
  }

}
