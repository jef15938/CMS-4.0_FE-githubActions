import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class DepartmentDetailInfo {

@IsNotEmpty()
public dept_id: string;
@IsNotEmpty()
public dept_name: string;


}