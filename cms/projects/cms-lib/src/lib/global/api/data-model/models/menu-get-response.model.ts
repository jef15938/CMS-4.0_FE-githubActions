import { ValidateNested } from 'class-validator';
import { MenuInfoModel } from './menu-info.model';
import { MenuGetResponse } from '../../neuxAPI/bean/MenuGetResponse';
import { Mapping, mapTo } from '../mapper';

// @dynamic
@Mapping<MenuGetResponse, MenuGetResponseModel>(
  MenuGetResponse, MenuGetResponseModel,
  (bean, model) => {
    model.datas = bean.datas.map(d => mapTo(MenuInfoModel, d));
  }
)
export class MenuGetResponseModel {

  @ValidateNested()
  public datas: Array<MenuInfoModel>;

}
