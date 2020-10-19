import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ContentBlockInfo } from '../../neuxAPI/bean/ContentBlockInfo';
import { ModelMapping, ModelMapper } from '@neux/core';
import { ContentTemplateInfoModel } from './content-template-info.model';

// @dynamic
@ModelMapping(
  ContentBlockInfo, ContentBlockInfoModel,
  (bean, model) => {
    model.blockId = bean.block_id;
    model.templates = ModelMapper.mapArrayTo(ContentTemplateInfoModel, bean.templates);
  }
)
export class ContentBlockInfoModel {

  @IsNotEmpty()
  public blockId: string;
  @ValidateNested()
  @IsNotEmpty()
  public templates: Array<ContentTemplateInfoModel>;

}
