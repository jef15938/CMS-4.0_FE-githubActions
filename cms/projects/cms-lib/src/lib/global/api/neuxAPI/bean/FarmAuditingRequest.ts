import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class FarmAuditingRequest {

@IsNotEmpty()
public data_id: string;
@IsNotEmpty()
public start_time: string;
@IsNotEmpty()
public end_time: string;
@IsNotEmpty()
public memo: string;
@IsNotEmpty()
public func_id: string;


}