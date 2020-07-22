import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { NewLineReplacePipe } from './new-line-replace.pipe';
import { GetFieldFromFieldsByIdPipe } from './get-field-from-fields-by-id.pipe';
import { GetTemplateInfoByLanguageIdPipe } from './get-template-info-by-language-id.pipe';

const PIPES = [
  SafeHtmlPipe,
  NewLineReplacePipe,
  GetFieldFromFieldsByIdPipe,
  GetTemplateInfoByLanguageIdPipe,
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
