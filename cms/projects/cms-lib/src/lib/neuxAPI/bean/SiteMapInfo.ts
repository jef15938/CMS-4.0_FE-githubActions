import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class SiteMapInfo {

@IsNotEmpty()
public node_id: string;
@IsNotEmpty()
public node_name: string;
@IsNotEmpty()
public canModify: boolean;
@IsNotEmpty()
public canSubmit: boolean;
@Type(() => SiteMapInfo)
@ValidateNested()
public children: Array<SiteMapInfo>;


}