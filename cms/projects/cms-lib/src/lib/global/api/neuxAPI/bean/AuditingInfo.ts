import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class AuditingInfo {

@IsNotEmpty()
public order_id: number;
@IsNotEmpty()
public order_name: string;
@IsNotEmpty()
public version: number;
@IsNotEmpty()
public start_time: string;
@IsNotEmpty()
public end_time: string;
public submit_comment: string;
@IsNotEmpty()
public create_name: string;


}