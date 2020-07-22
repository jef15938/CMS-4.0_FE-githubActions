import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmTableInfo} from './FarmTableInfo';
import {FarmFormInfo} from './FarmFormInfo';

import { TypeFactory } from '../type-factory';

export class FarmCategoryInfo {

@IsNotEmpty()
public category_id: string;
@IsNotEmpty()
public category_name: string;
@Type(TypeFactory(FarmFormInfo))
@ValidateNested()
public searchInfo: FarmFormInfo;
@Type(TypeFactory(FarmTableInfo))
@ValidateNested()
public tableInfo: FarmTableInfo;


}