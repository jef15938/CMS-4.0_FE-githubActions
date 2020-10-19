import { IsNotEmpty, ValidateNested } from 'class-validator';
import { FarmTreeInfo } from '../../neuxAPI/bean/FarmTreeInfo';
import { ModelMapping, ModelMapper } from '@neux/core';

// @dynamic
@ModelMapping(
  FarmTreeInfo, FarmTreeInfoModel,
  (bean, model) => {
    model.id = bean.id;
    model.name = bean.name;
    model.children = ModelMapper.mapArrayTo(FarmTreeInfoModel, bean.children);
  }
)
export class FarmTreeInfoModel {

  @IsNotEmpty()
  public id: string;
  @IsNotEmpty()
  public name: string;
  @ValidateNested()
  @IsNotEmpty()
  public children: Array<FarmTreeInfoModel>;

}
