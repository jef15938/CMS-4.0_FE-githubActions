import { IsNotEmpty } from 'class-validator';
import { ModelMapping } from '@neux/core';
import { GroupSitemapInfo } from '../../neuxAPI/bean/GroupSitemapInfo';

// @dynamic
@ModelMapping(
  GroupSitemapInfo, GroupSitemapInfoModel,
  (bean, model) => {
    model.nodeId = bean.node_id;
    model.canAdd = bean.can_add;
    model.canModify = bean.can_modify;
    model.canDelete = bean.can_delete;
  }
)
// @dynamic
@ModelMapping(
  GroupSitemapInfoModel, GroupSitemapInfo,
  (model, bean) => {
    bean.node_id = model.nodeId;
    bean.can_add = model.canAdd;
    bean.can_modify = model.canModify;
    bean.can_delete = model.canDelete;
  }
)
export class GroupSitemapInfoModel {

  @IsNotEmpty()
  public nodeId: string;
  @IsNotEmpty()
  public canAdd: boolean;
  @IsNotEmpty()
  public canModify: boolean;
  @IsNotEmpty()
  public canDelete: boolean;

}
