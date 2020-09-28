import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { NewLineReplacePipe } from './new-line-replace.pipe';
import { GetFieldFromFieldsByIdPipe } from './get-field-from-fields-by-id.pipe';
import { AddResourceBaseUrlPipe } from './add-resource-base-url.pipe';

const PIPES = [
  SafeHtmlPipe,
  NewLineReplacePipe,
  GetFieldFromFieldsByIdPipe,
  AddResourceBaseUrlPipe,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...PIPES,
  ],
  exports: [
    ...PIPES,
  ]
})
export class PipeModule { }
