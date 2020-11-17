import { ModelMapping, ModelMapper } from '@neux/core';
import { DetailObject } from '../../neuxAPI/bean/DetailObject';
import { ContentInfoModel } from './content-info.model';
import { plainToClass } from 'class-transformer';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';

// @dynamic
@ModelMapping(
  DetailObject, DetailObjectModel,
  (bean, model) => {
    model.contentId = bean.content_id;
    model.contentJson = bean.content_json;
    model.content = model.contentJson
      ? ModelMapper.mapModelTo(ContentInfoModel, plainToClass(ContentInfo, JSON.parse(model.contentJson)))
      : null;
  }
)
export class DetailObjectModel {
  public contentId: string;
  public contentJson: string;
  public content: ContentInfoModel;
}
