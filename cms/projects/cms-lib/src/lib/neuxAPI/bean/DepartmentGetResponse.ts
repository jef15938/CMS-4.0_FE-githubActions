import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {DepartmentInfo} from './DepartmentInfo';


export class DepartmentGetResponse {

@Type(() => DepartmentInfo)
@ValidateNested()
public datas: Array<DepartmentInfo>;


}