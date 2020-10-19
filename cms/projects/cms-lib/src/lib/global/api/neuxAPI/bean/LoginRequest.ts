import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class LoginRequest {

@IsNotEmpty()
public username: string;
@IsNotEmpty()
public password: string;
@IsNotEmpty()
public validation_code: number;


}