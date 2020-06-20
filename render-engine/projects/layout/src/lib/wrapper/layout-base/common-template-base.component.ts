import { LayoutBaseComponent } from './_base';
import { TemplateInfo } from '../../interface/template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';

export abstract class CommonTemplateBaseComponent extends LayoutBaseComponent<TemplateInfo> {
  templateType = TemplateType.COMMON;
}
