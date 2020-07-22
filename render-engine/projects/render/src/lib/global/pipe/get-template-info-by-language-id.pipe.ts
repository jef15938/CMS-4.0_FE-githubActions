import { Pipe, PipeTransform } from '@angular/core';
import { ContentTemplateInfo } from '../interface/content-template-info.interface';
import { ContentInfo } from '../interface/content-info.interface';

@Pipe({
  name: 'getTemplateInfoByLanguageId'
})
export class GetTemplateInfoByLanguageIdPipe implements PipeTransform {

  constructor() { }

  transform(contentInfo: ContentInfo, languageId: string): ContentTemplateInfo[] {
    const choosedLanguageInfo = contentInfo?.languages.find(lang => lang.language_id === languageId);
    return choosedLanguageInfo?.templates || [];
  }

}
