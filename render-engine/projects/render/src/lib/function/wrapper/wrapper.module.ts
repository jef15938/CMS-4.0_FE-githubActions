import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicWrapperModule } from '@neux/core';
import { TemplateWrapperComponent } from './template-wrapper/template-wrapper.component';
import { TemplatesContainerComponent } from './templates-container/templates-container.component';
// field
import { TemplateFieldTextDirective } from './template-field/template-field-text.directive';
import { TemplateFieldTextareaDirective } from './template-field/template-field-textarea.directive';
import { TemplateFieldLinkDirective } from './template-field/template-field-link.directive';
import { TemplateFieldBgimgDirective } from './template-field/template-field-bgimg.directive';
import { TemplateFieldImgDirective } from './template-field/template-field-img.directive';
import { TemplateFieldHtmlEditorDirective } from './template-field/template-field-html-editor.directive';

const FIELD_DIRECTIVES = [
  TemplateFieldTextDirective,
  TemplateFieldTextareaDirective,
  TemplateFieldLinkDirective,
  TemplateFieldBgimgDirective,
  TemplateFieldImgDirective,
  TemplateFieldHtmlEditorDirective,
];

@NgModule({
  imports: [
    CommonModule,
    DynamicWrapperModule,
  ],
  declarations: [
    TemplateWrapperComponent,
    TemplatesContainerComponent,
    ...FIELD_DIRECTIVES,
  ],
  exports: [
    TemplatesContainerComponent,
    ...FIELD_DIRECTIVES,
  ]
})
export class WrapperModule { }
