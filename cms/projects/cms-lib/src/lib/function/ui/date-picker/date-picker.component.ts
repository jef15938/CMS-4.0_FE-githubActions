import { Component, OnInit, forwardRef, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, Validator, FormGroup, FormBuilder, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CMS_DATE_FORMATS_DATE, CMS_DATE_FORMATS_DATETIME } from '../../../global/util/mat-date/mat-date';

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

  @Input() formControlName = '';
  @Input() label = '';
  @Input() appearance: any = 'legacy';
  @Input() errors;
  @Output() dateChange = new EventEmitter();

  form: FormGroup;

  model = {};

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
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.createInitValue());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors) {
      this.form?.setErrors(changes.errors.currentValue);
      this.form?.get(this.formControlName)?.setErrors(changes.errors.currentValue);
    }
  }

  createInitValue() {
    const result = {
      [`${this.formControlName}`]: [
        null,
        // Validators.compose([Validators.required])
      ],
    };
    return result;
  }

  // 以下是 ControlValueAccessor 需實做的方法
  writeValue(value: any): void {
    if (value) {
      this.form.patchValue({
        [`${this.formControlName}`]: value,
      });
    } else {
      this.form.patchValue(this.createInitValue());
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(values => fn(values[this.formControlName]));
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

  onDateChange(ev) {
    this.dateChange.emit(ev);
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
