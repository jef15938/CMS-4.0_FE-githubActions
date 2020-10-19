import { ValidateNested } from 'class-validator';
import { SiteMapGetResponse } from '../../neuxAPI/bean/SiteMapGetResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { SiteInfoModel } from './site-info.model';

// @dynamic
@ModelMapping(
  SiteMapGetResponse, SiteMapGetResponseModel,
  (bean, model) => {
    model.sites = ModelMapper.mapArrayTo(SiteInfoModel, bean.sites);
  }
)
export class SiteMapGetResponseModel {

  @ValidateNested()
  public sites: Array<SiteInfoModel>;
}
