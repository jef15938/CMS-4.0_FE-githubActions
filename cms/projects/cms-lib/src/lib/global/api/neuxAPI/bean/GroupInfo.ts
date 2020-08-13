import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class GroupInfo {

@IsNotEmpty()
public group_id: string;
@IsNotEmpty()
public group_name: string;


}