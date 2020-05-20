import { LayoutBaseComponent } from './_base';
import { TabTemplateInfo } from '../../interface/tab-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';

export abstract class TabTemplateBaseComponent extends LayoutBaseComponent<TabTemplateInfo> {
  templateType = TemplateType.TAB;
}