import { Component, ElementRef, HostBinding, Input, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { NxRadioButtonComponent } from '@neux/ui';
import { CustomizeBase, CustomizeBaseCtor, mixinCustomizeBase } from '../../base-component';
import { RadioGroupDirective } from '../radio-group.directive';

export type cardRadioAppearance = 'primary' | 'secondary';

const CardRadioMixinBase:
  CustomizeBaseCtor &
  typeof NxRadioButtonComponent
  = mixinCustomizeBase(NxRadioButtonComponent);

@Component({
  selector: 'rdr-card-radio',
  templateUrl: './card-radio.component.html',
  styleUrls: ['./card-radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: ['value', 'disabled', 'name', 'checked', 'required'],
})
export class CardRadioComponent extends CardRadioMixinBase implements OnInit, CustomizeBase {
  @HostBinding('class') class;
  @Input() imageUrl: string;
  @Input() styleType: cardRadioAppearance = 'primary';

  constructor(@Optional() radioGroup: RadioGroupDirective, elementRef: ElementRef) {
    super(radioGroup, elementRef);
  }

  ngOnInit(): void {
  }

}
