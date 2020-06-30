import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class GenerationHeader {

@IsNotEmpty()
public success: boolean;
public identity: string;


}