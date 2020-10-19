import { IsNotEmpty, ValidateNested } from 'class-validator';
import { MenuInfo } from '../../neuxAPI/bean/MenuInfo';
import { ModelMapping, ModelMapper } from '@neux/core';

// @dynamic
@ModelMapping(
  MenuInfo, MenuInfoModel,
  (bean, model) => {
    model.funcId = bean.func_id;
    model.funcName = bean.func_name;
    model.componentId = bean.component_id;
    model.children = ModelMapper.mapArrayTo(MenuInfoModel, bean.children);
  }
)
// @dynamic
@ModelMapping(
  MenuInfoModel, MenuInfo,
  (model, bean) => {
    bean.func_id = model.funcId;
    bean.func_name = model.funcName;
    bean.component_id = model.componentId;
    bean.children = ModelMapper.mapArrayTo(MenuInfo, model.children);
  }
)
export class MenuInfoModel {

  @IsNotEmpty()
  public funcId: string;
  @IsNotEmpty()
  public funcName: string;
  public componentId: string;

  @ValidateNested()
  @IsNotEmpty()
  public children: Array<MenuInfoModel>;

}
