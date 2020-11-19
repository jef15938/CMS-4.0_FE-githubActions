import { AfterContentInit, ContentChildren, Directive, forwardRef, Input, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxRadioGroup } from '@neux/ui';
import { CardRadioComponent } from './card-radio/card-radio.component';
import { RadioComponent } from './radio/radio.component';

@Directive({
  selector: 'rdr-radio-group',
  exportAs: 'rdrRadioGroup',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RadioGroupDirective)
  }],
  inputs: ['disabled', 'required', 'value', 'name']
})
export class RadioGroupDirective extends NxRadioGroup implements AfterContentInit {

  // TODO: 暫時寫法， 找每種型態的radio child ，在meage進childrenList
  @ContentChildren(
    forwardRef(() => CardRadioComponent), { descendants: true })
  cardRadios: QueryList<CardRadioComponent>;


  @ContentChildren(
    forwardRef(() => RadioComponent), { descendants: true })
  rdrRadios: QueryList<RadioComponent>;


  constructor() {
    super();
  }


  ngAfterContentInit() {
    this.radios = [...this.cardRadios, ...this.rdrRadios] as any;
    this.updateRadioButtonNames();
  }
}
