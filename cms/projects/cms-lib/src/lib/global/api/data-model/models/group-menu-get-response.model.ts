import { ValidateNested } from 'class-validator';
import { GroupMenuInfoModel } from './group-menu-info.model';
import { GroupMenuGetResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { Mapper, Mapping } from '../mapper';

@Mapping<GroupMenuGetResponse, GroupMenuGetResponseModel>(
  GroupMenuGetResponse, GroupMenuGetResponseModel,
  (bean, model) => {
    model.datas = bean.datas.map(d => Mapper.mapTo(GroupMenuInfoModel, d));
  }
)
export class GroupMenuGetResponseModel {

  @ValidateNested()
  public datas: Array<GroupMenuInfoModel>;

}
