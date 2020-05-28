import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'farmFormValidationErrors'
})
export class FarmFormValidationErrorsPipe implements PipeTransform {

  transform(errors: ValidationErrors): unknown {
    return Object.keys(errors).map(key => errors[key]);
  }

}
