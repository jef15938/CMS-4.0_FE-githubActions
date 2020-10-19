import { ValidateNested } from 'class-validator';
import { MenuInfoModel } from './menu-info.model';
import { MenuGetResponse } from '../../neuxAPI/bean/MenuGetResponse';
import { ModelMapping, ModelMapper } from '@neux/core';

// @dynamic
@ModelMapping(
  MenuGetResponse, MenuGetResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(MenuInfoModel, bean.datas);
  }
)
export class MenuGetResponseModel {

  @ValidateNested()
  public datas: Array<MenuInfoModel>;

}
