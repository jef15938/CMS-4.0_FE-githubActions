import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class DepartmentInfo {

@IsNotEmpty()
public dept_id: string;
@IsNotEmpty()
public dept_name: string;
@Type(() => DepartmentInfo)
@ValidateNested()
@IsNotEmpty()
public children: Array<DepartmentInfo>;


}