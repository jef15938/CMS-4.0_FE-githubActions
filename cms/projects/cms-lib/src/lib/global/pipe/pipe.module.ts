import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeResourcePipe } from './safe-resource.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { ObjectKeysPipe } from './object-keys.pipe';
import { DateStringFormatPipe } from './date-string-format.pipe';

const PIPES = [
  DateStringFormatPipe,
  SafeHtmlPipe,
  SafeResourcePipe,
  SafeUrlPipe,
  ObjectKeysPipe,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...PIPES,
  ],
  exports: [
    ...PIPES
  ],
})
export class PipeModule { }
