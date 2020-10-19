import { ValidateNested } from 'class-validator';
import { SiteGetResponse } from '../../neuxAPI/bean/SiteGetResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { SiteInfoModel } from './site-info.model';

// @dynamic
@ModelMapping(
  SiteGetResponse, SiteGetResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(SiteInfoModel, bean.datas);
  }
)
export class SiteGetResponseModel {

  @ValidateNested()
  public datas: Array<SiteInfoModel>;

}
