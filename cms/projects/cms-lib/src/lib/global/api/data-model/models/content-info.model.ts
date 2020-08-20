import { ValidateNested } from 'class-validator';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { LanguageInfoModel } from './language-info.model';

// @dynamic
@ModelMapping(
  ContentInfo, ContentInfoModel,
  (bean, model) => {
    model.languages = ModelMapper.mapArrayTo(LanguageInfoModel, bean.languages);
    model.galleries = [...bean.galleries];
  }
)
export class ContentInfoModel {

  @ValidateNested()
  public languages: Array<LanguageInfoModel>;
  public galleries: Array<string>;

}
