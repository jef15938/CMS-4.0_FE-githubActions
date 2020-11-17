import { Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxCheckboxComponent } from '@neux/ui';
import { CustomizeBaseDirective } from '../base-component';

export interface CheckboxData {
  id: string;
  title: string;
  disabled: boolean;
}

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
export class CheckboxComponent extends CustomizeBaseDirective implements OnInit, ControlValueAccessor {
  @ViewChild(NxCheckboxComponent, { static: true }) checkboxRef: NxCheckboxComponent;

  @Input() id = '';
  @Input() disabled = false;

  constructor(injector: Injector) {
    super(injector);
  }

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
