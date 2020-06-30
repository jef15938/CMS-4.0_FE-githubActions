import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmFormInfo} from './FarmFormInfo';

import { TypeFactory } from '../type-factory';

export class FarmInfoGetResponse {

@IsNotEmpty()
public category: Array<object>;
@Type(TypeFactory(FarmFormInfo))
@ValidateNested()
public detailInfo: FarmFormInfo;


}