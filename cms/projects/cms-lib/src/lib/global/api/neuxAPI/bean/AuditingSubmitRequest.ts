import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class AuditingSubmitRequest {

@IsNotEmpty()
public status: string;
public comment: string;


}