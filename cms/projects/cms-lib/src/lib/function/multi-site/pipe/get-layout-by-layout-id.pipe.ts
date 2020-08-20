import { Pipe, PipeTransform } from '@angular/core';
import { LayoutInfoModel } from '../../../global/api/data-model/models/layout-info.model';

@Pipe({
  name: 'getLayoutByLayoutID'
})
export class GetLayoutByLayoutIDPipe implements PipeTransform {

  constructor() { }

  transform(layoutID: string, layouts: LayoutInfoModel[]): LayoutInfoModel {
    return (layouts || []).find(l => l.layoutId === layoutID);
  }
}
