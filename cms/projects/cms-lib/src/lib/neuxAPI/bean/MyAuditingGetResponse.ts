import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MyAuditingInfo } from './MyAuditingInfo';
import { PageInfo } from './PageInfo';
import { TypeFactory } from '../type-factory';


export class MyAuditingGetResponse {

  @Type(TypeFactory(PageInfo))
  @ValidateNested()
  public pageInfo: PageInfo;
  @Type(TypeFactory(MyAuditingInfo))
  @ValidateNested()
  public datas: Array<MyAuditingInfo>;


}