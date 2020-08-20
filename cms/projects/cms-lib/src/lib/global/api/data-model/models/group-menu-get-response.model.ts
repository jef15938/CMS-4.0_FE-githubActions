import { ValidateNested } from 'class-validator';
import { GroupMenuInfoModel } from './group-menu-info.model';
import { GroupMenuGetResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';

// @dynamic
@ModelMapping(
  GroupMenuGetResponse, GroupMenuGetResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(GroupMenuInfoModel, bean.datas);
  }
)
export class GroupMenuGetResponseModel {

  @ValidateNested()
  public datas: Array<GroupMenuInfoModel>;

}
