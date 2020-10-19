import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FullSearchTypeInfo} from './FullSearchTypeInfo';
import {PageInfo} from './PageInfo';
import {FullSearchInfo} from './FullSearchInfo';

import { TypeFactory } from '../type-factory';

export class FullSearchGetResponse {

@Type(TypeFactory(FullSearchInfo))
@ValidateNested()
public datas: Array<FullSearchInfo>;
@Type(TypeFactory(PageInfo))
@ValidateNested()
@IsNotEmpty()
public page_info: PageInfo;
@Type(TypeFactory(FullSearchTypeInfo))
@ValidateNested()
public types: Array<FullSearchTypeInfo>;


}