import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class ContentDataSourceAction {

@IsNotEmpty()
public action_type: string;
@IsNotEmpty()
public action_name: string;
@IsNotEmpty()
public func_id: string;

}
