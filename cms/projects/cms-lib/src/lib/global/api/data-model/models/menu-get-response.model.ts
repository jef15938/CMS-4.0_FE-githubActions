import { ValidateNested } from 'class-validator';
import { MenuInfoModel } from './menu-info.model';
import { MenuGetResponse } from '../../neuxAPI/bean/MenuGetResponse';
import { Mapper, Mapping } from '../mapper';

@Mapping<MenuGetResponse, MenuGetResponseModel>(
  MenuGetResponse, MenuGetResponseModel,
  (bean, model) => {
    model.datas = bean.datas.map(d => Mapper.mapTo(MenuInfoModel, d));
  }
)
export class MenuGetResponseModel {

  @ValidateNested()
  public datas: Array<MenuInfoModel>;

}
