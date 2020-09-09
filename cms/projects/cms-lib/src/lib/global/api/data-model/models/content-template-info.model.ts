import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';
import { ModelMapping, ModelMapper } from '@neux/core';
import { ContentFieldInfoModel } from './content-field-info.model';
import { CmsErrorHandler } from '../../../error-handling';

// @dynamic
@ModelMapping(
  ContentTemplateInfo, ContentTemplateInfoModel,
  (bean, model) => {
    try {
      const beanKeys = Object.keys(bean);
      beanKeys.forEach(k => {
        model[k] = bean[k];
      });
      model.id = bean.id;
      model.templateId = bean.templateId;
      model.fields = ModelMapper.mapArrayTo(ContentFieldInfoModel, bean.fields);
      model.attributes = JSON.parse(JSON.stringify(bean.attributes));
      model.hidden = (bean as any).hidden;
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'ContentTemplateInfoModel @ModelMapping()', '資料解析錯誤');
    }
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
  hidden?: boolean;
}
