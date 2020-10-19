import { ValidateNested, IsNotEmpty } from 'class-validator';
import { ListFarmTriggerDataResponse } from '../../neuxAPI/bean/ListFarmTriggerDataResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { FarmOptionInfoModel } from './farm-option-info.model';

// @dynamic
@ModelMapping(
  ListFarmTriggerDataResponse, ListFarmTriggerDataResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(FarmOptionInfoModel, bean.datas);
  }
)
export class ListFarmTriggerDataResponseModel {

  @ValidateNested()
  @IsNotEmpty()
  public datas: Array<FarmOptionInfoModel>;

}
