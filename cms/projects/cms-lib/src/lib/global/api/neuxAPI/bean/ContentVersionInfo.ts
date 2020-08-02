import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class ContentVersionInfo {

@IsNotEmpty()
public version: number;
@IsNotEmpty()
public create_time: string;
@IsNotEmpty()
public create_by: string;


}