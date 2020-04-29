import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {AuditingDetailInfo} from './AuditingDetailInfo';
import {GenerationHeader} from './GenerationHeader';


export class AuditingDetailGetResponse {

@Type(() => GenerationHeader)
@ValidateNested()
public header: GenerationHeader;
@Type(() => AuditingDetailInfo)
@ValidateNested()
public body: Array<AuditingDetailInfo>;


}