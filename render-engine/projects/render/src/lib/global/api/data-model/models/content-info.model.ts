import { ValidateNested } from 'class-validator';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ModelMapping, ModelMapper } from '@neux/core';
import { LanguageInfoModel } from './language-info.model';

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

}
