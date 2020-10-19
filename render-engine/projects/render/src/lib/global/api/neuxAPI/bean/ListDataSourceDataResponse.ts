import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {PageInfo} from './PageInfo';

import { TypeFactory } from '../type-factory';

export class ListDataSourceDataResponse {

@IsNotEmpty()
public datas: Array<string>;
@Type(TypeFactory(PageInfo))
@ValidateNested()
public page_info: PageInfo;


}