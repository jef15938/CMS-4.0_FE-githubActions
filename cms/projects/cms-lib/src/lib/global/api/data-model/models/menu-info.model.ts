import { IsNotEmpty, ValidateNested } from 'class-validator';
import { MenuInfo } from '../../neuxAPI/bean/MenuInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';

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
