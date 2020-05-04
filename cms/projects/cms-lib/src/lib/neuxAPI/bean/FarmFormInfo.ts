import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmValidationInfo} from './FarmValidationInfo';


export class FarmFormInfo {

@IsNotEmpty()
public split_size: number;
public columns: Array<object>;
@Type(() => FarmValidationInfo)
@ValidateNested()
public validation: FarmValidationInfo;


}