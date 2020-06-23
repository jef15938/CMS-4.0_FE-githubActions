import { LayoutBaseComponent } from './_base';
import { TemplateInfo } from '../../interface/template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector } from '@angular/core';

export abstract class CommonTemplateBaseComponent extends LayoutBaseComponent<TemplateInfo> {
  templateType = TemplateType.COMMON;

  constructor(
    injector: Injector,
  ) { super(injector); }
}
