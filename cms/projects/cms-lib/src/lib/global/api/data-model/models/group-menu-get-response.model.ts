import { ValidateNested } from 'class-validator';
import { GroupMenuInfoModel } from './group-menu-info.model';
import { GroupMenuGetResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { Mapping, mapTo } from '../mapper';

// @dynamic
@Mapping<GroupMenuGetResponse, GroupMenuGetResponseModel>(
  GroupMenuGetResponse, GroupMenuGetResponseModel,
  (bean, model) => {
    model.datas = bean.datas.map(d => mapTo(GroupMenuInfoModel, d));
  }
)
export class GroupMenuGetResponseModel {

  @ValidateNested()
  public datas: Array<GroupMenuInfoModel>;

}
