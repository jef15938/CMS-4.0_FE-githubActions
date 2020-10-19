import { Pipe, PipeTransform } from '@angular/core';
import { ContentFieldInfoModel } from '../api/data-model/models/content-field-info.model';

@Pipe({
  name: 'getFieldFromFieldsById'
})
export class GetFieldFromFieldsByIdPipe implements PipeTransform {

  constructor() { }

  transform(fields: ContentFieldInfoModel[], fieldId: string): ContentFieldInfoModel {
    return (fields || []).find(f => f.fieldId === fieldId);
  }

}
