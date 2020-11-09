import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeResourcePipe } from './safe-resource.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { ObjectKeysPipe } from './object-keys.pipe';
import { DateStringFormatPipe } from './date-string-format.pipe';
import { FormValidationErrorPipe } from './form-validation-error.pipe';
import { ReadableFileSizePipe } from './readable-file-size.pipe';
import { SplitTextPipe } from './split-text.pipe';

const PIPES = [
  DateStringFormatPipe,
  FormValidationErrorPipe,
  SafeHtmlPipe,
  SafeResourcePipe,
  SafeUrlPipe,
  ObjectKeysPipe,
  ReadableFileSizePipe,
  SplitTextPipe,
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
