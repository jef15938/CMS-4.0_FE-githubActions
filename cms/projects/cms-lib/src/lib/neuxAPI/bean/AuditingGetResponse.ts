import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {AuditingInfo} from './AuditingInfo';
import {PageInfo} from './PageInfo';


export class AuditingGetResponse {

@Type(() => PageInfo)
@ValidateNested()
public pageInfo: PageInfo;
@Type(() => AuditingInfo)
@ValidateNested()
public datas: Array<AuditingInfo>;


}