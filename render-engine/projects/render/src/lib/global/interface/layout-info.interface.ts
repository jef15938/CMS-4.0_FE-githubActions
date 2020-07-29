import { ContentTemplateInfo } from './content-template-info.interface';

export interface LayoutInfo extends ContentTemplateInfo {
  children: ContentTemplateInfo[];
}
