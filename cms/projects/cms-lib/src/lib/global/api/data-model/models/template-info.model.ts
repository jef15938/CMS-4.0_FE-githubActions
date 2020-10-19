import { IsNotEmpty } from 'class-validator';
import { TemplateInfo } from '../../neuxAPI/bean/TemplateInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  TemplateInfo, TemplateInfoModel,
  (bean, model) => {
    model.templateId = bean.template_id;
    model.templateName = bean.template_name;
    model.templateThumbnail = bean.template_thumbnail;
  }
)
export class TemplateInfoModel {

  @IsNotEmpty()
  public templateId: string;
  @IsNotEmpty()
  public templateName: string;
  @IsNotEmpty()
  public templateThumbnail: string;

}
