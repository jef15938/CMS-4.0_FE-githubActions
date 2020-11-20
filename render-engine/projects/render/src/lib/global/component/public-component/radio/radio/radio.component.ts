import { AfterViewInit, Component, OnInit, ViewEncapsulation, Optional, ElementRef } from '@angular/core';
import { NxRadioButtonComponent } from '@neux/ui';
import { CustomizeBase, CustomizeBaseCtor, mixinCustomizeBase } from '../../base-component';
import { RadioGroupDirective } from '../radio-group.directive';

const radioMixinBase:
  CustomizeBaseCtor &
  typeof NxRadioButtonComponent
  = mixinCustomizeBase(NxRadioButtonComponent);

@Component({
  selector: 'rdr-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: ['value', 'disabled', 'name', 'checked', 'required'],
})
export class RadioComponent extends radioMixinBase implements OnInit, AfterViewInit, CustomizeBase {

  constructor(@Optional() radioGroup: RadioGroupDirective, elementRef: ElementRef) {
    super(radioGroup, elementRef);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() { }
}
