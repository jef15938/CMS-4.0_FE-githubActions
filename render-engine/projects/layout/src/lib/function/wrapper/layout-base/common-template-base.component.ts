import { LayoutBaseComponent } from './_base';
import { TemplateInfo } from '../../../global/interface/template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector, Directive } from '@angular/core';

@Directive()
export abstract class CommonTemplateBaseComponent extends LayoutBaseComponent<TemplateInfo> {
  templateType = TemplateType.COMMON;

  constructor(
    injector: Injector,
  ) { super(injector); }
}
