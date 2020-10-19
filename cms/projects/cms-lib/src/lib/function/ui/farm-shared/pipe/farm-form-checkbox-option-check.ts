import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'farmFormCheckboxOptionCheck'
})
export class FarmFormCheckboxOptionCheckPipe implements PipeTransform {

  constructor() { }

  transform(fieldValue: string, optionValue): boolean {
    const values = (fieldValue || '').split(',');
    return values.indexOf(optionValue) > -1;
  }

}
