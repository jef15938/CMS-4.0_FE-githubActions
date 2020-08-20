import { ValidateNested } from 'class-validator';
import { MyAuditingGetResponse } from '../../neuxAPI/bean/MyAuditingGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { MyAuditingInfoModel } from './my-auditing-info.model';
import { PageInfoModel } from './page-info.model';

// @dynamic
@ModelMapping(
  MyAuditingGetResponse, MyAuditingGetResponseModel,
  (bean, model) => {
    model.pageInfo = ModelMapper.mapModelTo(PageInfoModel, bean.pageInfo);
    model.datas = ModelMapper.mapArrayTo(MyAuditingInfoModel, bean.datas);
  }
)
export class MyAuditingGetResponseModel {

  @ValidateNested()
  public pageInfo: PageInfoModel;

  @ValidateNested()
  public datas: Array<MyAuditingInfoModel>;

}
