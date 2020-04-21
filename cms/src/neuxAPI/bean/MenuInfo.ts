import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class MenuInfo {

@IsNotEmpty()
public func_id: string;
@IsNotEmpty()
public func_name: string;
public component_id: string;
@Type(() => MenuInfo)
@ValidateNested()
@IsNotEmpty()
public children: Array<MenuInfo>;


}