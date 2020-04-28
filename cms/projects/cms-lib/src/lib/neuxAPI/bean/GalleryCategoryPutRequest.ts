import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class GalleryCategoryPutRequest {

@IsNotEmpty()
public category_name: string;
public parent_id: string;
@IsNotEmpty()
public assign_dept_id: string;


}