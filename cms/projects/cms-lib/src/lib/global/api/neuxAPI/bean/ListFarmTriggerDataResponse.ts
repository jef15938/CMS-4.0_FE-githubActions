import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmOptionInfo} from './FarmOptionInfo';

import { TypeFactory } from '../type-factory';

export class ListFarmTriggerDataResponse {

@Type(TypeFactory(FarmOptionInfo))
@ValidateNested()
@IsNotEmpty()
public datas: Array<FarmOptionInfo>;


}