import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class SiteInfo {

@IsNotEmpty()
public site_id: string;
@IsNotEmpty()
public site_name: string;


}