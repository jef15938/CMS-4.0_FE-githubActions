import { ValidateNested, IsNotEmpty } from 'class-validator';
import { GetFarmTreeResponse } from '../../neuxAPI/bean/GetFarmTreeResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { FarmTreeInfoModel } from './farm-tree-info.model';

// @dynamic
@ModelMapping(
  GetFarmTreeResponse, GetFarmTreeResponseModel,
  (bean, model) => {
    model.checkType = bean.check_type;
    model.data = ModelMapper.mapArrayTo(FarmTreeInfoModel, bean.data);
  }
)
export class GetFarmTreeResponseModel {

  @IsNotEmpty()
  public checkType: string;
  @ValidateNested()
  public data: Array<FarmTreeInfoModel>;

}
