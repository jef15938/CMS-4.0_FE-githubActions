import { ValidateNested, IsNotEmpty } from 'class-validator';
import { LoginInfoModel } from './login-info.model';
import { LoginResponse } from '../../neuxAPI/bean/LoginResponse';
import { ModelMapping, ModelMapper } from '@neux/core';

// @dynamic
@ModelMapping(
  LoginResponse, LoginResponseModel,
  (bean, model) => {
    model.loginInfo = ModelMapper.mapModelTo(LoginInfoModel, bean.loginInfo);
  }
)
export class LoginResponseModel {

  @ValidateNested()
  @IsNotEmpty()
  public loginInfo: LoginInfoModel;

}
