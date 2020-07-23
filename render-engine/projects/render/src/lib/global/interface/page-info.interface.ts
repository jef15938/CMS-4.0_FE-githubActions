import { ContentInfo } from './content-info.interface';

export interface PageInfo {
  layoutID: string;
  metaTitle: string;
  meta_description: string;
  meta_keyword: string;
  meta_image: string;
  content: ContentInfo;
}
