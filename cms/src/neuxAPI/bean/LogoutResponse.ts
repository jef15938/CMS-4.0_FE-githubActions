import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {GenerationHeader} from './GenerationHeader';


export class LogoutResponse {

@Type(() => GenerationHeader)
@ValidateNested()
@IsNotEmpty()
public header: GenerationHeader;


}