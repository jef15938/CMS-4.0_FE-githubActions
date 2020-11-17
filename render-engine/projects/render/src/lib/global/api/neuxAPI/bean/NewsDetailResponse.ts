import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {DetailObject} from './DetailObject';
import {ResponseHeader} from './ResponseHeader';

import { TypeFactory } from '../type-factory';

export class NewsDetailResponse {

@Type(TypeFactory(ResponseHeader))
@ValidateNested()
public header: ResponseHeader;
@Type(TypeFactory(DetailObject))
@ValidateNested()
public data: DetailObject;


}