import { ModelMapping, ModelMapper } from '@neux/core';
import { DynamicInfoResponse } from '../../neuxAPI/bean/DynamicInfoResponse';
import { PageInfoGetResponseModel } from './page-info-get-response.model';
import { plainToClass } from 'class-transformer';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentInfoModel } from './content-info.model';

// @dynamic
@ModelMapping(
  DynamicInfoResponse, DynamicInfoResponseModel,
  (bean, model) => {
    model.pageInfo = ModelMapper.mapModelTo(PageInfoGetResponseModel, bean.page_info);
    model.contentJson = bean.content_json;
    model.content = ModelMapper.mapModelTo(ContentInfoModel, plainToClass(ContentInfo, model.contentJson));
  }
)
export class DynamicInfoResponseModel {
  public pageInfo: PageInfoGetResponseModel;
  public contentJson: string;
  public content: ContentInfoModel;
}
