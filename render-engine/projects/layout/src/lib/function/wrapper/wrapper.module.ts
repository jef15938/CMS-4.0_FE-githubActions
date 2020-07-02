import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';
import { TemplatesContainerComponent } from './templates-container/templates-container.component';
import { LayoutFieldTextDirective } from './layout-wrapper/field-directive/layout-field-text.directive';
import { LayoutFieldTextareaDirective } from './layout-wrapper/field-directive/layout-field-textarea.directive';
import { LayoutFieldLinkDirective } from './layout-wrapper/field-directive/layout-field-link.directive';
import { LayoutFieldBgimgDirective } from './layout-wrapper/field-directive/layout-field-bgimg.directive';
import { LayoutFieldImgDirective } from './layout-wrapper/field-directive/layout-field-img.directive';
import { LayoutFieldHtmlEditorDirective } from './layout-wrapper/field-directive/layout-field-html-editor.directive';
import { DynamicWrapperModule } from '../dynamic-wrapper/dynamic-wrapper.module';

const FIELD_DIRECTIVES = [
  LayoutFieldTextDirective,
  LayoutFieldTextareaDirective,
  LayoutFieldLinkDirective,
  LayoutFieldBgimgDirective,
  LayoutFieldImgDirective,
  LayoutFieldHtmlEditorDirective,
];

@NgModule({
  imports: [
    CommonModule,
    DynamicWrapperModule,
  ],
  declarations: [
    LayoutWrapperComponent,
    TemplatesContainerComponent,
    ...FIELD_DIRECTIVES,
  ],
  exports: [
    TemplatesContainerComponent,
    ...FIELD_DIRECTIVES,
  ]
})
export class WrapperModule { }
