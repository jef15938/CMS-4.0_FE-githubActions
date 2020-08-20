import { ValidateNested } from 'class-validator';
import { ListGroupResponst } from '../../neuxAPI/bean/ListGroupResponst';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { GroupInfoModel } from './group-info.model';

// @dynamic
@ModelMapping(
  ListGroupResponst, ListGroupResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(GroupInfoModel, bean.datas);
  }
)
export class ListGroupResponseModel {

  @ValidateNested()
  public datas: Array<GroupInfoModel>;

}
