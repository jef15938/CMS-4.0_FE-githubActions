import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class GroupSitemapInfo {

@IsNotEmpty()
public node_id: string;
@IsNotEmpty()
public can_add: boolean;
@IsNotEmpty()
public can_modify: boolean;
@IsNotEmpty()
public can_delete: boolean;


}