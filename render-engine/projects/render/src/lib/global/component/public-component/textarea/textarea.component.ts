import { Component, forwardRef, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomizeBaseDirective } from '../base-component';

export const RDR_TEXTAREA_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaComponent),
  multi: true
};

@Component({
  selector: 'rdr-textarea',
  providers: [RDR_TEXTAREA_CONTROL_VALUE_ACCESSOR],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TextareaComponent extends CustomizeBaseDirective implements OnInit, ControlValueAccessor {

  @Input() placeholder = '請輸入';
  @Input() disabled = false;
  @Input() isError = false;
  @Input() required = false;

  value: string;

  onChange = (value) => { };
  onTouched = () => { };

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  valueChange() {
    this.onChange(this.value);
  }
}
