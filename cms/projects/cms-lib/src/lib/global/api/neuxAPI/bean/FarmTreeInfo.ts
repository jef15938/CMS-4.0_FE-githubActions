import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class FarmTreeInfo {

@IsNotEmpty()
public id: string;
@IsNotEmpty()
public name: string;
@Type(TypeFactory(FarmTreeInfo))
@ValidateNested()
@IsNotEmpty()
public children: Array<FarmTreeInfo>;


}