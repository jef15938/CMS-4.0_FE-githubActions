import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {DepartmentInfo} from './DepartmentInfo';
import {GenerationHeader} from './GenerationHeader';


export class DepartmentGetResponse {

@Type(() => GenerationHeader)
@ValidateNested()
public header: GenerationHeader;
@Type(() => DepartmentInfo)
@ValidateNested()
public body: Array<DepartmentInfo>;


}