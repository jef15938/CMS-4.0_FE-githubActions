import { LayoutBaseComponent } from './_base';
import { DataSourceTemplateInfo } from '../../interface/data-source-template-info.interface';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';

export abstract class DataSourceTemplateBaseComponent extends LayoutBaseComponent<DataSourceTemplateInfo> {
  templateType = TemplateType.DATA_SOURCE;
}