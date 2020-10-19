import { Component, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS,
  FormGroup, Validators, FormBuilder
} from '@angular/forms';

enum Sex {
  NONE, MALE, FEMALE
}

class Person {
  name: string;
  sex: Sex;
}

@Component({
  selector: 'cms-farm-custom-form-control',
  templateUrl: './farm-custom-form-control.component.html',
  styleUrls: ['./farm-custom-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FarmCustomFormControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FarmCustomFormControlComponent),
      multi: true
    }
  ]
})
export class FarmCustomFormControlComponent implements OnInit, ControlValueAccessor, Validator {

  form: FormGroup;

  model: Person = new Person();

  sexList: { value: Sex, display: string }[] = [
    {
      value: Sex.NONE,
      display: 'NONE',
    },
    {
      value: Sex.MALE,
      display: 'MALE',
    },
    {
      value: Sex.FEMALE,
      display: 'FEMALE',
    }
  ];

  // 用來接收 setDisabledState 的狀態
  disabled = false;

  // 用來接收 registerOnChange 和 onTouched 傳入的方法
  onChange: (value) => {};
  onTouched: () => {};

  // 元件內必須找一個時機觸發 change 方法
  controlValueChange() {
    this.onChange(this.model);
  }

  constructor(
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group(this.createInitValue());
  }

  ngOnInit(): void {
  }

  createInitValue() {
    return {
      name: ['', Validators.compose([Validators.required])],
      sex: Sex.NONE,
    };
  }

  // 以下是 ControlValueAccessor 需實做的方法
  writeValue(person: Person): void {
    if (person) {
      this.form.patchValue(person);
    } else {
      this.form.patchValue(this.createInitValue());
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(values => fn(values));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.form.valid === false) {
      for (const controlName of Object.keys(this.form.controls)) {
        if (this.form.controls[controlName].errors) {
          return { controlName: this.form.controls[controlName].errors };
        }
      }
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    // console.warn('registerOnValidatorChange() fn = ', fn ? fn.toString() : null);
  }

}
