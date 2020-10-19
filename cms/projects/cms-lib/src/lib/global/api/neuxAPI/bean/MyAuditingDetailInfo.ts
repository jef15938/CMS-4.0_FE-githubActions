import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class MyAuditingDetailInfo {

@IsNotEmpty()
public auditing_group_name: string;
@IsNotEmpty()
public auditing_stage: number;
public auditing_name: string;
public auditing_dept_name: string;
public status: string;
public auditing_time: string;
public auditing_comment: string;


}