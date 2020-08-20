import { ValidateNested } from 'class-validator';
import { LanguageInfo } from '../../neuxAPI/bean/LanguageInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { ContentTemplateInfoModel } from './content-template-info.model';

// @dynamic
@ModelMapping(
  LanguageInfo, LanguageInfoModel,
  (bean, model) => {
    model.languageId = bean.language_id;
    model.languageName = bean.language_name;
    model.templates = ModelMapper.mapArrayTo(ContentTemplateInfoModel, bean.templates);
  }
)
export class LanguageInfoModel {

  public languageId: string;
  public languageName: string;

  @ValidateNested()
  public templates: Array<ContentTemplateInfoModel>;

}
