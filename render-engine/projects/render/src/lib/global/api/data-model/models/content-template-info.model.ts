import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';
import { ModelMapping, ModelMapper } from '@neux/core';
import { ContentFieldInfoModel } from './content-field-info.model';

// @dynamic
@ModelMapping(
  ContentTemplateInfo, ContentTemplateInfoModel,
  (bean, model) => {
    const beanKeys = Object.keys(bean);
    beanKeys.forEach(k => {
      model[k] = bean[k];
    });
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
  public attributes: { [key: string]: any };

}
