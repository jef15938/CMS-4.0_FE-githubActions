import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {FarmFormInfo} from './FarmFormInfo';


export class FarmInfoGetResponse {

@IsNotEmpty()
public category: Array<object>;
@Type(() => FarmFormInfo)
@ValidateNested()
public detailInfo: FarmFormInfo;


}