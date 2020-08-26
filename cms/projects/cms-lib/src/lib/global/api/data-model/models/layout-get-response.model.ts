import { ValidateNested } from 'class-validator';
import { LayoutGetResponse } from '../../neuxAPI/bean/LayoutGetResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { LayoutInfoModel } from './layout-info.model';

// @dynamic
@ModelMapping(
  LayoutGetResponse, LayoutGetResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(LayoutInfoModel, bean.datas);
  }
)
export class LayoutGetResponseModel {

  @ValidateNested()
  public datas: Array<LayoutInfoModel>;

}
