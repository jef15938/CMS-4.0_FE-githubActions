import { Component, forwardRef, Input, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CustomizeBaseDirective } from '../base-component';

export const RDR_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'rdr-input',
  providers: [RDR_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent extends CustomizeBaseDirective implements OnInit, ControlValueAccessor {

  @Input() placeholder = '請輸入';
  @Input() disabled = false;
  @Input() isError = false;
  @Input() type = 'text';
  @Input() required = false;

  value: string;

  onChange = (value) => { };
  onTouched = () => { };

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  valueChange() {
    this.onChange(this.value);
  }
}
