import { ValidateNested } from 'class-validator';
import { AuditingGetResponse } from '../../neuxAPI/bean/AuditingGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { AuditingInfoModel } from './auditing-info.model';
import { PageInfoModel } from './page-info.model';

// @dynamic
@ModelMapping(
  AuditingGetResponse, AuditingGetResponseModel,
  (bean, model) => {
    model.pageInfo = ModelMapper.mapModelTo(PageInfoModel, bean.pageInfo);
    model.datas = ModelMapper.mapArrayTo(AuditingInfoModel, bean.datas);
  }
)
export class AuditingGetResponseModel {

  @ValidateNested()
  public pageInfo: PageInfoModel;

  @ValidateNested()
  public datas: Array<AuditingInfoModel>;

}
