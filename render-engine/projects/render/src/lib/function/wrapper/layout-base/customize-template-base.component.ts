import { LayoutBaseComponent } from './layout-base.component';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector, Directive } from '@angular/core';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';

@Directive()
export abstract class CustomizeTemplateBaseComponent extends LayoutBaseComponent<ContentTemplateInfoModel> {

  abstract defaultTemplateInfo: ContentTemplateInfoModel;

  get TYPE_ID() { return this.TEMPLATE_ID; }

  templateType = TemplateType.CUSTOMIZE;

  constructor(injector: Injector, templateId: string) { super(injector, templateId); }
}
