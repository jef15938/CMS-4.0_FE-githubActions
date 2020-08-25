import { IsNotEmpty } from 'class-validator';
import { ContentDataSourceAction } from '../../neuxAPI/bean/ContentDataSourceAction';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  ContentDataSourceAction, ContentDataSourceActionModel,
  (bean, model) => {
    model.actionType = bean.action_type;
    model.actionName = bean.action_name;
  }
)
export class ContentDataSourceActionModel {

  @IsNotEmpty()
  public actionType: string;
  @IsNotEmpty()
  public actionName: string;

}
