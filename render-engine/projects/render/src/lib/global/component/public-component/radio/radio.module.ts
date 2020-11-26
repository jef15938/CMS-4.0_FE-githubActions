import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxUiModule } from '@neux/ui';
import { CardRadioComponent } from './card-radio/card-radio.component';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupDirective } from './radio-group.directive';
import { TagRadioComponent } from './tag-radio/tag-radio.component';


@NgModule({
  declarations: [
    CardRadioComponent,
    RadioComponent,
    RadioGroupDirective,
    TagRadioComponent
  ],
  imports: [
    CommonModule,
    NxUiModule
  ],
  exports: [
    CardRadioComponent,
    RadioComponent,
    RadioGroupDirective,
    TagRadioComponent
  ]
})
export class RadioModule { }
