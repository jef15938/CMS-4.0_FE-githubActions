import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AuditingInfo } from './AuditingInfo';
import { PageInfo } from './PageInfo';
import { TypeFactory } from '../type-factory';


export class AuditingGetResponse {

  @Type(TypeFactory(PageInfo))
  @ValidateNested()
  public pageInfo: PageInfo;
  @Type(TypeFactory(AuditingInfo))
  @ValidateNested()
  public datas: Array<AuditingInfo>;


}
