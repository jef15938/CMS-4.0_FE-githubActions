import { ValidateNested } from 'class-validator';
import { GroupMenuInfoModel } from './group-menu-info.model';
import { GroupMenuGetResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';

// @dynamic
@ModelMapping<GroupMenuGetResponse, GroupMenuGetResponseModel>(
  GroupMenuGetResponse, GroupMenuGetResponseModel,
  (bean, model) => {
    model.datas = bean.datas.map(d => ModelMapper.mapModelTo(GroupMenuInfoModel, d));
  }
)
export class GroupMenuGetResponseModel {

  @ValidateNested()
  public datas: Array<GroupMenuInfoModel>;

}
