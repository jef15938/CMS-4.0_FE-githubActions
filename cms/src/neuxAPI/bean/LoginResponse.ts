import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {LoginInfo} from './LoginInfo';
import {GenerationHeader} from './GenerationHeader';


export class LoginResponse {

@Type(() => GenerationHeader)
@ValidateNested()
@IsNotEmpty()
public header: GenerationHeader;
@Type(() => LoginInfo)
@ValidateNested()
@IsNotEmpty()
public body: LoginInfo;


}