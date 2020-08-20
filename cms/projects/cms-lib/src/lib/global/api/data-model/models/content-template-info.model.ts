import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { ContentFieldInfoModel } from './content-field-info.model';

// @dynamic
@ModelMapping(
  ContentTemplateInfo, ContentTemplateInfoModel,
  (bean, model) => {
    model.id = bean.id;
    model.templateId = bean.templateId;
    model.fields = ModelMapper.mapArrayTo(ContentFieldInfoModel, bean.fields);
    model.attributes = JSON.parse(JSON.stringify(bean.attributes));
  }
)
export class ContentTemplateInfoModel {

  @IsNotEmpty()
  public id: string;
  @IsNotEmpty()
  public templateId: string;
  @ValidateNested()
  @IsNotEmpty()
  public fields: Array<ContentFieldInfoModel>;
  @IsNotEmpty()
  public attributes: { [key: string]: string };

}
