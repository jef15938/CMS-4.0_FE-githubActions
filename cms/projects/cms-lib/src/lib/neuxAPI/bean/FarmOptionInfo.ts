import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';


export class FarmOptionInfo {

@IsNotEmpty()
public value: string;
@IsNotEmpty()
public text: string;


}