import { ValidateNested } from 'class-validator';
import { MenuInfoModel } from './menu-info.model';
import { MenuGetResponse } from '../../neuxAPI/bean/MenuGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';

// @dynamic
@ModelMapping<MenuGetResponse, MenuGetResponseModel>(
  MenuGetResponse, MenuGetResponseModel,
  (bean, model) => {
    model.datas = bean.datas.map(d => ModelMapper.mapModelTo(MenuInfoModel, d));
  }
)
export class MenuGetResponseModel {

  @ValidateNested()
  public datas: Array<MenuInfoModel>;

}
