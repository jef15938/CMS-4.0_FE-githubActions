import { Pipe, PipeTransform } from '@angular/core';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { LanguageInfoModel } from '../api/data-model/models/language-info.model';

@Pipe({
  name: 'getLanguageInfo'
})
export class GetLanguageInfoPipe implements PipeTransform {

  constructor() { }

  transform(value: ContentInfoModel, lang: string): LanguageInfoModel {
    if (!value || !lang) { return null; }
    console.warn({ value, lang });
    return (value.languages || []).find(languageInfoModel => languageInfoModel.languageId === lang);
  }

}
