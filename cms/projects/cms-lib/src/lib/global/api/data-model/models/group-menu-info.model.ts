import { IsNotEmpty } from 'class-validator';
import { GroupMenuInfo } from '../../neuxAPI/bean/GroupMenuInfo';
import { Mapping } from '../mapper';

@Mapping(
  GroupMenuInfo, GroupMenuInfoModel,
  (bean, model) => {
    model.funcId = bean.func_id;
  }
)
@Mapping(
  GroupMenuInfoModel, GroupMenuInfo,
  (model, bean) => {
    bean.func_id = model.funcId;
  }
)
export class GroupMenuInfoModel {

  @IsNotEmpty()
  public funcId: string;

}
