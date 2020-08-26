import { ValidateNested, IsNotEmpty } from 'class-validator';
import { FarmInfoGetResponse } from '../../neuxAPI/bean/FarmInfoGetResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { FarmFormInfoModel } from './farm-form-info.model';
import { FarmCategoryInfoModel } from './farm-category-info.model';

// @dynamic
@ModelMapping(
  FarmInfoGetResponse, FarmInfoGetResponseModel,
  (bean, model) => {
    model.category = ModelMapper.mapArrayTo(FarmCategoryInfoModel, bean.category);
    model.detailInfo = bean.detailInfo ? ModelMapper.mapModelTo(FarmFormInfoModel, bean.detailInfo) : null;
  }
)
export class FarmInfoGetResponseModel {

  @ValidateNested()
  @IsNotEmpty()
  public category: Array<FarmCategoryInfoModel>;
  @ValidateNested()
  public detailInfo: FarmFormInfoModel;

}
