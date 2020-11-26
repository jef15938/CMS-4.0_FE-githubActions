import { Pipe, PipeTransform } from '@angular/core';
import { TemplateInfoModel } from '../api/data-model/models/template-info.model';

@Pipe({
  name: 'templateTypeShow'
})
export class TemplateTypeShowPipe implements PipeTransform {
  constructor() { }
  transform(datas: TemplateInfoModel[]): boolean {
    return (datas || []).some(f => f.show);
  }
}
