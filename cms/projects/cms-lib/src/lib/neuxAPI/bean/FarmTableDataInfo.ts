import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class FarmTableDataInfo {

@IsNotEmpty()
public data_id: string;
@IsNotEmpty()
public is_checked: boolean;
public columns: Array<object>;


}