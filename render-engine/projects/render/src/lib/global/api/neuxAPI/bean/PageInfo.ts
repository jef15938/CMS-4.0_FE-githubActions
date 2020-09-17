import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class PageInfo {

@IsNotEmpty()
public totalPageSize: number;
@IsNotEmpty()
public totalRecSize: number;
@IsNotEmpty()
public page: number;


}