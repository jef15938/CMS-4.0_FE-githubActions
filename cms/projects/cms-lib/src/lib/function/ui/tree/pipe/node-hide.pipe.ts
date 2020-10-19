import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodeHide'
})
export class NodeHidePipe implements PipeTransform {

  transform(data: any, checkNodeHide: (data) => boolean): boolean {
    if (!data || !checkNodeHide || typeof (checkNodeHide) !== 'function') { return false; }
    return checkNodeHide(data);
  }

}
