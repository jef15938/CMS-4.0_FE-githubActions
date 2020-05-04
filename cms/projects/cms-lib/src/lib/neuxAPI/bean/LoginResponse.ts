import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {LoginInfo} from './LoginInfo';


export class LoginResponse {

@Type(() => LoginInfo)
@ValidateNested()
@IsNotEmpty()
public loginInfo: LoginInfo;


}