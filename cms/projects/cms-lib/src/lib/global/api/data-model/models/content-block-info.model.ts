import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ContentBlockInfo } from '../../neuxAPI/bean/ContentBlockInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { ContentTemplateInfoModel } from './content-template-info.model';

// @dynamic
@ModelMapping(
  ContentBlockInfo, ContentBlockInfoModel,
  (bean, model) => {
    model.block_id = bean.block_id;
    model.templates = ModelMapper.mapArrayTo(ContentTemplateInfoModel, bean.templates);
  }
)
export class ContentBlockInfoModel {

  @IsNotEmpty()
  public block_id: string;
  @ValidateNested()
  @IsNotEmpty()
  public templates: Array<ContentTemplateInfoModel>;

}
