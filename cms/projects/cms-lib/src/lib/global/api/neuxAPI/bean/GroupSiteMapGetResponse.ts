import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class GroupSiteMapGetResponse {

@IsNotEmpty()
public datas: object;


}