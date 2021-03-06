import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class LoginInfo {

@IsNotEmpty()
public user_id: string;
@IsNotEmpty()
public user_name: string;
@IsNotEmpty()
public dept_id: string;


}