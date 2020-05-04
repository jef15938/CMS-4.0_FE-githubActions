import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {MyAuditingInfo} from './MyAuditingInfo';
import {PageInfo} from './PageInfo';


export class MyAuditingGetResponse {

@Type(() => PageInfo)
@ValidateNested()
public pageInfo: PageInfo;
@Type(() => MyAuditingInfo)
@ValidateNested()
public datas: Array<MyAuditingInfo>;


}