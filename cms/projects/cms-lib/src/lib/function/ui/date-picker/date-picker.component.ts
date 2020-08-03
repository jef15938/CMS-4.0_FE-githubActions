import { Component, OnInit, forwardRef, Output, EventEmitter, Input, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { ControlValueAccessor, Validator, FormGroup, FormBuilder, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, NgControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CMS_DATE_FORMATS_DATE, CMS_DATE_FORMATS_DATETIME } from '../../../global/util/mat-date/mat-date';
import { CmsFormValidator } from '../../../global/util/form-validator';

@Component({
  selector: 'cms-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    { provide: MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATE }
  ]
})
export class DatePickerComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() readonly = false;
  @Input() formControlName = '';
  @Input() label = '';
  @Input() appearance: any = 'legacy';
  @Input() errors;
  @Output() dateChange = new EventEmitter();

  form: FormGroup;

  model = {};

  // 用來接收 setDisabledState 的狀態
  disabled = false;

  onTouched: () => {};
  onValidatorChange: () => void;

  ngControl: NgControl;;

  constructor(
    private formBuilder: FormBuilder,
    private injector: Injector,
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [`${this.formControlName}`]: [
        null,
        Validators.compose([CmsFormValidator.validDate])
      ],
    });
    this.ngControl = this.injector.get(NgControl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors) {
      this.form?.setErrors(changes.errors.currentValue);
      this.form?.get(this.formControlName)?.setErrors(changes.errors.currentValue);
    }
  }

  createInitValue() {
    const config = {
      [`${this.formControlName}`]: [null, Validators.compose([CmsFormValidator.validDate])],
    };
    return config;
  }

  // 以下是 ControlValueAccessor 需實做的方法
  writeValue(value: any): void {
    if (value) {
      this.form.patchValue({
        [`${this.formControlName}`]: value,
      });
    } else {
      this.form.patchValue({ [`${this.formControlName}`]: null });
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(values => {
      const innerControl = this.form.get(this.formControlName);
      if (innerControl.valid) {
        fn(values[this.formControlName]);
      } else {
        this.ngControl.control.setErrors(innerControl.errors);
      }
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    if (
      control.value
      && Object.prototype.toString.call(control.value) === '[object Date]'
      && isNaN(control.value.getTime())
    ) {
      // is Invalid Date
      if (control.parent.valid) { control.parent.updateValueAndValidity({ onlySelf: false, emitEvent: true }); }
      return null;
    }

    const innerControl = this.form.controls[this.formControlName];
    const innerErrors = innerControl.errors;
    const outerErrors = control.errors;
    const result = innerErrors ? { [this.formControlName]: innerErrors } : null;
    return result;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  onDateChange(ev) {
    this.dateChange.emit(ev);
  }

  onDateInput(ev) {
    // console.warn('onDateInput() ev = ', ev);
  }

}

@Component({
  selector: 'cms-date-picker-datetime',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerDatetimeComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerDatetimeComponent),
      multi: true
    },
    { provide: MAT_DATE_FORMATS, useValue: CMS_DATE_FORMATS_DATETIME }
  ]
})
export class DatePickerDatetimeComponent extends DatePickerComponent { }
