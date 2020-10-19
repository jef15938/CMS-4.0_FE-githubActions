import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formValidationError'
})
export class FormValidationErrorPipe implements PipeTransform {

  transform(errors: ValidationErrors): string[] {
    if (errors.required) { return ['必填欄位']; }
    if (errors.matDatepickerParse || errors.matDatetimePickerParse) { return ['日期格式不符']; }
    const result = Object.keys(errors).map(key => errors[key]);
    return result;
  }

}
