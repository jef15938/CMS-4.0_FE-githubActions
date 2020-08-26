import { IsNotEmpty } from 'class-validator';
import { GroupMenuInfo } from '../../neuxAPI/bean/GroupMenuInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  GroupMenuInfo, GroupMenuInfoModel,
  (bean, model) => {
    model.funcId = bean.func_id;
  }
)
// @dynamic
@ModelMapping(
  GroupMenuInfoModel, GroupMenuInfo,
  (model, bean) => {
    bean.func_id = model.funcId;
  }
)
export class GroupMenuInfoModel {

  @IsNotEmpty()
  public funcId: string;

}
