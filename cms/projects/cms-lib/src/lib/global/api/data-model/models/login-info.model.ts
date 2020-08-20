import { IsNotEmpty } from 'class-validator';
import { LoginInfo } from '../../neuxAPI/bean/LoginInfo';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  LoginInfo, LoginInfoModel,
  (bean, model) => {
    model.userId = bean.user_id;
    model.userName = bean.user_name;
    model.deptId = bean.dept_id;
  }
)
export class LoginInfoModel {

  @IsNotEmpty()
  public userId: string;
  @IsNotEmpty()
  public userName: string;
  @IsNotEmpty()
  public deptId: string;

}
