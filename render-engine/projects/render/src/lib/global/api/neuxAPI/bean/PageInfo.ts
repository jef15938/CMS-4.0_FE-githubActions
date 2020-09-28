import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class PageInfo {

public total_page_size: number;
public total_rec_size: number;
@IsNotEmpty()
public page: number;


}