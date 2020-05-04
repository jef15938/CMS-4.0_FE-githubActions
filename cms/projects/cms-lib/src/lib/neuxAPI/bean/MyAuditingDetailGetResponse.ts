import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {MyAuditingDetailInfo} from './MyAuditingDetailInfo';


export class MyAuditingDetailGetResponse {

@Type(() => MyAuditingDetailInfo)
@ValidateNested()
public datas: Array<MyAuditingDetailInfo>;


}