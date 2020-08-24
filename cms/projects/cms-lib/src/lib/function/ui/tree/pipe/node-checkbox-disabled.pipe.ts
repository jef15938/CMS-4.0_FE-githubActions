import { Pipe, PipeTransform, ComponentRef } from '@angular/core';
import { CmsTree, CmsTreeNodeRenderer } from '../tree.interface';

@Pipe({
  name: 'nodeCheckboxDisabled'
})
export class NodeCheckboxDisabledPipe implements PipeTransform {

  transform(data: any, checkDisabledFunction: (data) => boolean): boolean {
    if (!data || !checkDisabledFunction) { return false; }
    return checkDisabledFunction(data);
  }

}
