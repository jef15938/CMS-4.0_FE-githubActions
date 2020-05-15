import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class TemplateInfo {

@IsNotEmpty()
public template_id: string;
@IsNotEmpty()
public template_name: string;
@IsNotEmpty()
public template_thumbnail: string;


}