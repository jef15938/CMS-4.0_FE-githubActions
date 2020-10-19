import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {MyAuditingDetailInfo} from './MyAuditingDetailInfo';

import { TypeFactory } from '../type-factory';

export class MyAuditingDetailGetResponse {

@Type(TypeFactory(MyAuditingDetailInfo))
@ValidateNested()
public datas: Array<MyAuditingDetailInfo>;


}