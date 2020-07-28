import { ContentTemplateInfo } from './content-template-info.interface';

export interface LanguageInfo {
  languageID: string;
  languageName: string;
  templates: ContentTemplateInfo[];
}
