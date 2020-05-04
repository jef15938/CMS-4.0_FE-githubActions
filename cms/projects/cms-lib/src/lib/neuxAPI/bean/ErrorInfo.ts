import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class ErrorInfo {

@IsNotEmpty()
public error_code: string;
@IsNotEmpty()
public error_message: string;


}