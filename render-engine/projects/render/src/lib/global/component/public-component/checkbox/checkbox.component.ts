import { Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxCheckboxComponent } from '@neux/ui';
import { CheckboxData } from './checkbox.interface';

@Component({
  selector: 'rdr-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CheckboxComponent)
  }]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @ViewChild(NxCheckboxComponent, { static: true }) checkboxRef: NxCheckboxComponent;

  @Input() data: CheckboxData = {
    id: '',
    value: '0',
    title: '我已閱讀並同意',
    checked: false,
    disabled: false
  };
  constructor() { }

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    this.checkboxRef.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this.checkboxRef.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.checkboxRef.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.checkboxRef.setDisabledState(isDisabled);
  }

}
