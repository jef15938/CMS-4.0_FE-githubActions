import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {ShortCutObject} from './ShortCutObject';
import {ResponseHeader} from './ResponseHeader';

import { TypeFactory } from '../type-factory';

export class ShortCutResponse {

@Type(TypeFactory(ResponseHeader))
@ValidateNested()
@IsNotEmpty()
public header: ResponseHeader;
@Type(TypeFactory(ShortCutObject))
@ValidateNested()
@IsNotEmpty()
public datas: Array<ShortCutObject>;


}