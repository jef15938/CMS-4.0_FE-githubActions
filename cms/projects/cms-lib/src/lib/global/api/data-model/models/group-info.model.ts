import { IsNotEmpty } from 'class-validator';
import { GroupInfo } from '../../neuxAPI/bean/GroupInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  GroupInfo, GroupInfoModel,
  (bean, model) => {
    model.groupId = bean.group_id;
    model.groupName = bean.group_name;
  }
)
export class GroupInfoModel {

  @IsNotEmpty()
  public groupId: string;
  @IsNotEmpty()
  public groupName: string;

}
