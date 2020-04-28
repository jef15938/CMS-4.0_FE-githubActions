import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class GenerationHeader {

@IsNotEmpty()
public error_code: string;
public error_message: string;


}