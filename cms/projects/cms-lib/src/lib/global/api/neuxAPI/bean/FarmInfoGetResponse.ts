import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmFormInfo} from './FarmFormInfo';
import {FarmCategoryInfo} from './FarmCategoryInfo';

import { TypeFactory } from '../type-factory';

export class FarmInfoGetResponse {

@Type(TypeFactory(FarmCategoryInfo))
@ValidateNested()
@IsNotEmpty()
public category: Array<FarmCategoryInfo>;
@Type(TypeFactory(FarmFormInfo))
@ValidateNested()
public detailInfo: FarmFormInfo;


}