import { ValidateNested } from 'class-validator';
import { MyAuditingDetailInfoModel } from './my-auditing-detail-info.model';
import { MyAuditingDetailGetResponse } from '../../neuxAPI/bean/MyAuditingDetailGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';

// @dynamic
@ModelMapping(
  MyAuditingDetailGetResponse, MyAuditingDetailGetResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(MyAuditingDetailInfoModel, bean.datas);
  }
)
export class MyAuditingDetailGetResponseModel {

  @ValidateNested()
  public datas: Array<MyAuditingDetailInfoModel>;

}
