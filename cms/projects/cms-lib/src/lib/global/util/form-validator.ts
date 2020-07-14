import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export class CmsFormValidator {

  static startTimeEndTime(startFormControlName: string, endFormControlName: string): ValidatorFn {
    // Error encountered in metadata generated for exported symbol : Lambda not supported.
    // tslint:disable-next-line: only-arrow-functions
    const func = (formGroup: FormGroup): ValidationErrors | null => {
      if (formGroup) {
        const startFormControl = formGroup.get(startFormControlName);
        const endFormControl = formGroup.get(endFormControlName);
        const startTime: Date = startFormControl.value;
        const endTime: Date = endFormControl.value;
        if (startTime && endTime && !(endTime > startTime)) {
          const error = {
            startTimeEndTime: '結束時間需大於開始時間'
          };
          startFormControl.setErrors(error);
          endFormControl.setErrors(error);
          return error;
        } else {
          startFormControl.setErrors(null);
          endFormControl.setErrors(null);
        }
      }
      return null;
    };
    return func;
  }

}
