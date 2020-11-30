import { Injector } from '@angular/core';
import { TemplateBaseComponent } from './template-base.component';
import { TemplateType } from '../template-wrapper/template-wrapper.interface';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';

export abstract class CommonTemplateBaseComponent extends TemplateBaseComponent<ContentTemplateInfoModel> {
  templateType = TemplateType.COMMON;

  constructor(injector: Injector, templateId: string) { super(injector, templateId); }
}
