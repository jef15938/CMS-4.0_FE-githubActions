import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';


export class FarmValidationInfo {

public required: Array<object>;
public email: Array<object>;
public alphanumeric: Array<object>;
public number: Array<object>;
public range: Array<object>;


}