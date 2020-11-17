import { ModelMapping, ModelMapper } from '@neux/core';
import { NewsDetailResponse } from '../../neuxAPI/bean/NewsDetailResponse';
import { DetailObjectModel } from './detail-object-model';

// @dynamic
@ModelMapping(
  NewsDetailResponse, NewsDetailResponseModel,
  (bean, model) => {
    model.data = ModelMapper.mapModelTo(DetailObjectModel, bean.data);
  }
)
export class NewsDetailResponseModel {
  public data: DetailObjectModel;
}
