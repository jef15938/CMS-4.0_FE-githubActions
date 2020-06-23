import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { NewLineReplacePipe } from './pipes/new-line-replace.pipe';
import { GetFieldFromFieldsByIdPipe } from './pipes/get-field-from-fields-by-id.pipe';

const PIPES = [
  SafeHtmlPipe,
  NewLineReplacePipe,
  GetFieldFromFieldsByIdPipe,
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
