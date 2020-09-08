import { ModelMapping, ModelMapper } from '@neux/core';
import { SitesResponse } from '../../neuxAPI/bean/SitesResponse';
import { SiteModel } from './site.model';

// @dynamic
@ModelMapping(
  SitesResponse, SitesResponseModel,
  (bean, model) => {
    model.sites = ModelMapper.mapArrayTo(SiteModel, bean.sites);
  }
)
export class SitesResponseModel {
  sites: SiteModel[];
}
