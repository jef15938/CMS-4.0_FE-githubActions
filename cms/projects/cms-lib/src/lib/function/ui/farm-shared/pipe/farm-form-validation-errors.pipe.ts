import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'farmFormValidationErrors'
})
export class FarmFormValidationErrorsPipe implements PipeTransform {

  transform(errors: ValidationErrors): string[] {
    if (errors.matDatepickerParse) { return ['日期格式不符']; }
    return Object.keys(errors).map(key => errors[key]);
  }

}
