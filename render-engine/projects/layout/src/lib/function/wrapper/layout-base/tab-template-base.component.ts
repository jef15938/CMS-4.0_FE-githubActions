import { LayoutBaseComponent } from './_base';
import { TabTemplateInfo } from '../../../global/interface/tab-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { Injector, Directive } from '@angular/core';

@Directive()
export abstract class TabTemplateBaseComponent extends LayoutBaseComponent<TabTemplateInfo> {
  templateType = TemplateType.TAB;
  /**
   * 必填，Tab個數限制
   */
  abstract maxItemCount: number;

  constructor(
    injector: Injector,
  ) { super(injector); }
}
