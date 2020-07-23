import { Pipe, PipeTransform } from '@angular/core';
import { LayoutInfo } from '../../../global/api/neuxAPI/bean/LayoutInfo';

@Pipe({
  name: 'getLayoutByLayoutID'
})
export class GetLayoutByLayoutIDPipe implements PipeTransform {

  constructor() { }

  transform(layoutID: string, layouts: LayoutInfo[]): LayoutInfo {
    return (layouts || []).find(l => l.layout_id === layoutID);
  }
}
