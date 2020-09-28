import { ModelMapping, ModelMapper } from '@neux/core';
import { SiteInfo } from '../../neuxAPI/bean/SiteInfo';
import { SiteMapInfoModel } from './site-map-info.model';

// @dynamic
@ModelMapping(
  SiteInfo, SiteInfoModel,
  (bean, model) => {
    model.siteId = bean.siteId;
    model.siteMap = ModelMapper.mapArrayTo(SiteMapInfoModel, bean.siteMap);
  }
)
export class SiteInfoModel {
  siteId: string;
  siteMap: SiteMapInfoModel[];
}
