import { ContentTemplateInfo } from './content-template-info.interface';

export interface LanguageInfo {
  language_id: string;
  language_name: string;
  templates: ContentTemplateInfo[];
  galleries: string[];
}
