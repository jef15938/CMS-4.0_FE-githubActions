import { ValidateNested } from 'class-validator';
import { LanguageInfo } from '../../neuxAPI/bean/LanguageInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { ContentTemplateInfoModel } from './content-template-info.model';

// @dynamic
@ModelMapping(
  LanguageInfo, LanguageInfoModel,
  (bean, model) => {
    model.blocks = (bean as any).blocks;
    model.languageId = bean.language_id;
    model.languageName = bean.language_name;
    model.templates = ModelMapper.mapArrayTo(ContentTemplateInfoModel, bean.templates);
  }
)
export class LanguageInfoModel {

  public blocks: {
    block_id: string;
    templates: Array<ContentTemplateInfoModel>;
  }[];
  public languageId: string;
  public languageName: string;

  @ValidateNested()
  public templates: Array<ContentTemplateInfoModel>;

}
