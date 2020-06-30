import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class MyAuditingInfo {

@IsNotEmpty()
public order_id: number;
@IsNotEmpty()
public order_name: string;
@IsNotEmpty()
public status: string;
@IsNotEmpty()
public start_time: string;
@IsNotEmpty()
public end_time: string;
@IsNotEmpty()
public version: string;


}