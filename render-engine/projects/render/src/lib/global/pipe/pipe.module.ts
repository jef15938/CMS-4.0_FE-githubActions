import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { NewLineReplacePipe } from './new-line-replace.pipe';
import { GetFieldFromFieldsByIdPipe } from './get-field-from-fields-by-id.pipe';
import { AddResourceBaseUrlPipe } from './add-resource-base-url.pipe';
import { TransformDataPipe } from './transform-data.pipe';
import { GetLanguageInfoPipe } from './get-language-info.pipe';
import { StringToContentInfoModelPipe } from './string-to-content-info-model.pipe';
import { EllipsisPipe } from './string-filter-format.pipe';
import { PageInfoPipe } from './transform-page.pipe';

const PIPES = [
  SafeHtmlPipe,
  NewLineReplacePipe,
  GetFieldFromFieldsByIdPipe,
  AddResourceBaseUrlPipe,
  TransformDataPipe,
  StringToContentInfoModelPipe,
  GetLanguageInfoPipe,
  EllipsisPipe,
  PageInfoPipe
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
