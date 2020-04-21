import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class DepartmentMaintainRequest {

@IsNotEmpty()
public dept_name: string;
public parent_id: string;


}