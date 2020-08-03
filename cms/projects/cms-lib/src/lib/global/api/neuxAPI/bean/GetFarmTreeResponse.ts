import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmTreeInfo} from './FarmTreeInfo';

import { TypeFactory } from '../type-factory';

export class GetFarmTreeResponse {

@IsNotEmpty()
public check_type: string;
@Type(TypeFactory(FarmTreeInfo))
@ValidateNested()
public data: Array<FarmTreeInfo>;


}