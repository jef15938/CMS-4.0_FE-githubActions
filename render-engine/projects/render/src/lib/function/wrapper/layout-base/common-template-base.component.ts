import { LayoutBaseComponent } from './_base';
import { ContentTemplateInfo } from '../../../global/interface/content-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector } from '@angular/core';

export abstract class CommonTemplateBaseComponent extends LayoutBaseComponent<ContentTemplateInfo> {
  templateType = TemplateType.COMMON;

  constructor(
    injector: Injector,
  ) { super(injector); }
}
