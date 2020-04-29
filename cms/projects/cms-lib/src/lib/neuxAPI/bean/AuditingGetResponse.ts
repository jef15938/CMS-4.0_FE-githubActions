import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {GenerationHeader} from './GenerationHeader';


export class AuditingGetResponse {

@Type(() => GenerationHeader)
@ValidateNested()
public header: GenerationHeader;
public body: object;


}