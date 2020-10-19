import { IsNotEmpty } from 'class-validator';
import { ContentDataSourceAction } from '../../neuxAPI/bean/ContentDataSourceAction';
import { ModelMapping } from '@neux/core';

export enum ContentDataSourceActionType {
  FARM = 'FARM',
}

// @dynamic
@ModelMapping(
  ContentDataSourceAction, ContentDataSourceActionModel,
  (bean, model) => {
    model.actionType = bean.action_type;
    model.actionName = bean.action_name;
    model.funcId = bean.func_id;
  }
)
export class ContentDataSourceActionModel {

  @IsNotEmpty()
  public actionType: string;
  @IsNotEmpty()
  public actionName: string;
  @IsNotEmpty()
  public funcId: string;

}
