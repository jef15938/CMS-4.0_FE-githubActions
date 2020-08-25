import { ValidateNested, IsNotEmpty } from 'class-validator';
import { LanguageInfo } from '../../neuxAPI/bean/LanguageInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { ContentBlockInfoModel } from './content-block-info.model';

// @dynamic
@ModelMapping(
  LanguageInfo, LanguageInfoModel,
  (bean, model) => {
    model.languageId = bean.language_id;
    model.languageName = bean.language_name;
    model.blocks = ModelMapper.mapArrayTo(ContentBlockInfoModel, bean.blocks);
  }
)
export class LanguageInfoModel {

  public languageId: string;
  public languageName: string;
  @ValidateNested()
  @IsNotEmpty()
  public blocks: Array<ContentBlockInfoModel>;

}
