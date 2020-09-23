import { Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxSelectComponent } from '@neux/ui';
import { SelectData } from './select.interface';

@Component({
  selector: 'rdr-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SelectComponent)
  }]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @ViewChild(NxSelectComponent) selectRef: NxSelectComponent;

  @Input() data: SelectData = {
    hasSearchbar: true,
    defaultOptionText: '請選擇',
    isError: false,
    disabled: false,
    optionList: [
      { value: '1', name: '要當爸爸媽媽了' },
      { value: '2', name: '喜歡一個人生活' },
      { value: '3', name: '要結婚了' },
      { value: '4', name: '想買第一份保單' },
      { value: '5', name: '想擁有美好的退休生活' },
      { value: '6', name: '想買房了' }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    this.selectRef.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this.selectRef.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.selectRef.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.selectRef.setDisabledState(isDisabled);
  }

}
