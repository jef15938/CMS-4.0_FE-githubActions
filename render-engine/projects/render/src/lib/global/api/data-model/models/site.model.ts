import { ModelMapping, ModelMapper } from '@neux/core';
import { Site } from '../../neuxAPI/bean/Site';
import { SiteMapGetResponseModel } from './site-map-get-response.model';

// @dynamic
@ModelMapping(
  Site, SiteModel,
  (bean, model) => {
    model.siteId = bean.siteId;
    model.siteMap = ModelMapper.mapArrayTo(SiteMapGetResponseModel, bean.siteMap);
  }
)
export class SiteModel {
  siteId: string;
  siteMap: SiteMapGetResponseModel[];
}
