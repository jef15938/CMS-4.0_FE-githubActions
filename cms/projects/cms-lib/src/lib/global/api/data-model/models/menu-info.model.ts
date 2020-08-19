import { IsNotEmpty, ValidateNested } from 'class-validator';
import { MenuInfo } from '../../neuxAPI/bean/MenuInfo';
import { Mapper, Mapping } from '../mapper';

@Mapping(
  MenuInfo, MenuInfoModel,
  (bean, model) => {
    model.funcId = bean.func_id;
    model.funcName = bean.func_name;
    model.componentId = bean.component_id;
    model.children = bean.children.map(c => Mapper.mapTo(MenuInfoModel, c));
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
