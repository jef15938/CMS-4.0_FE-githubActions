import { LayoutBaseComponent } from './layout-base.component';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector } from '@angular/core';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';

export abstract class CommonTemplateBaseComponent extends LayoutBaseComponent<ContentTemplateInfoModel> {
  templateType = TemplateType.COMMON;

  constructor(
    injector: Injector,
  ) { super(injector); }
}
