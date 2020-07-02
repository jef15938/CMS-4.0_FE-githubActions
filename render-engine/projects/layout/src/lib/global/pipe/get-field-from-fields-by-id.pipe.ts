import { Pipe, PipeTransform } from '@angular/core';
import { FieldInfo } from '../interface/field-info.interface';

@Pipe({
  name: 'getFieldFromFieldsById'
})
export class GetFieldFromFieldsByIdPipe implements PipeTransform {

  constructor() { }

  transform(fields: FieldInfo[], fieldId: string): FieldInfo {
    return (fields || []).find(f => f.fieldId === fieldId);
  }

}
