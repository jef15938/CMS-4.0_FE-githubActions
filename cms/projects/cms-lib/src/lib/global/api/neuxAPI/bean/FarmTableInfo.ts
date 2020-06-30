import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmTableDataInfo} from './FarmTableDataInfo';
import {PageInfo} from './PageInfo';

import { TypeFactory } from '../type-factory';

export class FarmTableInfo {

@Type(TypeFactory(PageInfo))
@ValidateNested()
@IsNotEmpty()
public pageInfo: PageInfo;
@IsNotEmpty()
public can_create: boolean;
@IsNotEmpty()
public can_checkbox: boolean;
@Type(TypeFactory(FarmTableDataInfo))
@ValidateNested()
public datas: Array<FarmTableDataInfo>;


}