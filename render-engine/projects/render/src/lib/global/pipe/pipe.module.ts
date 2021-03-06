import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { NewLineReplacePipe } from './new-line-replace.pipe';
import { GetFieldFromFieldsByIdPipe } from './get-field-from-fields-by-id.pipe';
import { AddResourceBaseUrlForHtmlPipe } from './add-resource-base-url-for-html.pipe';
import { TransformDataPipe } from './transform-data.pipe';
import { GetLanguageInfoPipe } from './get-language-info.pipe';
import { AddResourceBaseUrlForFieldPipe } from './add-resource-base-url-for-field.pipe';
import { StringToContentInfoModelPipe } from './string-to-content-info-model.pipe';
import { EllipsisPipe } from './ellipsis.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { SafeResourcePipe } from './safe-resource.pipe';

const PIPES = [
  SafeHtmlPipe,
  SafeUrlPipe,
  SafeResourcePipe,
  NewLineReplacePipe,
  GetFieldFromFieldsByIdPipe,
  AddResourceBaseUrlForFieldPipe,
  AddResourceBaseUrlForHtmlPipe,
  TransformDataPipe,
  StringToContentInfoModelPipe,
  GetLanguageInfoPipe,
  EllipsisPipe,
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
