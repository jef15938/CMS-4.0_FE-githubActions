import { Injector, Directive } from '@angular/core';
import { TemplateBaseComponent } from './template-base.component';
import { TemplateType } from '../template-wrapper/template-wrapper.interface';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';

@Directive()
export abstract class CustomizeTemplateBaseComponent extends TemplateBaseComponent<ContentTemplateInfoModel> {

  abstract defaultTemplateInfo: ContentTemplateInfoModel;

  get TYPE_ID() { return this.TEMPLATE_ID; }

  templateType = TemplateType.CUSTOMIZE;

  constructor(injector: Injector, templateId: string) { super(injector, templateId); }
}
