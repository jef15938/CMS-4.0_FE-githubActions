import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

import { TypeFactory } from '../type-factory';

export class PageInfo {

public totalPageSize: number;
public totalRecSize: number;
public page: number;


}