import { Component, ElementRef, HostBinding, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { NxRadioButtonComponent } from '@neux/ui';
import { CustomizeBaseCtor, mixinCustomizeBase } from '../../base-component';
import { RadioGroupDirective } from '../radio-group.directive';

const TagRadioMixinBase:
  CustomizeBaseCtor &
  typeof NxRadioButtonComponent
  = mixinCustomizeBase(NxRadioButtonComponent);

@Component({
  selector: 'rdr-tag-radio',
  templateUrl: './tag-radio.component.html',
  styleUrls: ['./tag-radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: ['value', 'disabled', 'name', 'checked', 'required'],
})
export class TagRadioComponent extends TagRadioMixinBase implements OnInit {
  @HostBinding('class') class;

  constructor(
    @Optional() radioGroup: RadioGroupDirective,
    elementRef: ElementRef
  ) {
    super(radioGroup, elementRef);
  }

  ngOnInit(): void {
  }

}
