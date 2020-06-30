import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { LoginInfo } from './LoginInfo';
import { TypeFactory } from './../type-factory';


export class LoginResponse {

  @Type(TypeFactory(LoginInfo))
  @ValidateNested()
  @IsNotEmpty()
  public loginInfo: LoginInfo;


}
