import { AfterViewInit, Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxRadioGroup } from '@neux/ui';
import { RadioData } from './radio.interface';

@Component({
  selector: 'rdr-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RadioComponent)
  }]
})
export class RadioComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @ViewChild(NxRadioGroup, { static: true }) radioGroupRef: NxRadioGroup;

  @Input() groupName: string;
  @Input() dataList: Array<RadioData> = [
    { title: '男', value: '0' },
    { title: '女', value: '1' }
  ] as any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() { }

  writeValue(obj: any): void {
    this.radioGroupRef.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this.radioGroupRef.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.radioGroupRef.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.radioGroupRef.setDisabledState(isDisabled);
  }
}
