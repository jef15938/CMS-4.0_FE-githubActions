import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmTableDataInfo} from './FarmTableDataInfo';
import {PageInfo} from './PageInfo';


export class FarmTableInfo {

@Type(() => PageInfo)
@ValidateNested()
@IsNotEmpty()
public pageInfo: PageInfo;
@IsNotEmpty()
public can_create: boolean;
@IsNotEmpty()
public can_checkbox: boolean;
@Type(() => FarmTableDataInfo)
@ValidateNested()
public datas: Array<FarmTableDataInfo>;


}