import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class GroupMenuGetResponse {

@IsNotEmpty()
public datas: object;


}