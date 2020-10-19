import { ValidateNested } from 'class-validator';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ModelMapping, ModelMapper } from '@neux/core';
import { LanguageInfoModel } from './language-info.model';
import { ContentTemplateInfoModel } from './content-template-info.model';

// @dynamic
@ModelMapping(
  ContentInfo, ContentInfoModel,
  (bean, model) => {
    model.languages = ModelMapper.mapArrayTo(LanguageInfoModel, bean.languages);
  }
)
export class ContentInfoModel {

  @ValidateNested()
  public languages: Array<LanguageInfoModel>;

  /**
   * 根據語系回傳對應contentInfo
   *
   * @private
   * @param {ContentInfo} contentInfo
   * @param {string} languageID
   * @returns {ContentTemplateInfo[]}
   * @memberof RenderComponent
   */
  static getTemplateInfoByLanguageId(contentInfo: ContentInfoModel, languageID: string): ContentTemplateInfoModel[] {
    // 異常資料處理
    if (!contentInfo || !languageID) { return []; }
    const languageInfoList = contentInfo.languages;
    if (!languageInfoList?.length) { return []; }

    const templatesByLanguage: ContentTemplateInfoModel[] =
      languageInfoList.find(lang => lang.languageId === languageID)?.blocks
        .map(b => b.templates).reduce((a, b) => a.concat(b || []), [] as ContentTemplateInfoModel[]);
    // 回傳對應 languageID 的資料 || []
    return templatesByLanguage || [];
  }

}
