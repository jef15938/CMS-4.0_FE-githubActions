import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class ContentFieldInfo {

@IsNotEmpty()
public fieldId: string;
@IsNotEmpty()
public fieldType: string;
@IsNotEmpty()
public fieldVal: string;
@IsNotEmpty()
public extension: object;


}