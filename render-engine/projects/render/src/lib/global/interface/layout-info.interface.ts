import { ContentTemplateInfo } from './content-template-info.interface';
import { SitemapNode } from './sitemap-node.interface';

export interface LayoutInfo extends ContentTemplateInfo {
  children: ContentTemplateInfo[];
  attributes: {
    sitemap: SitemapNode
  };
}
