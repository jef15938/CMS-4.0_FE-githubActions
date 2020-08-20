import { ValidateNested } from 'class-validator';
import { DepartmentGetResponse } from '../../neuxAPI/bean/DepartmentGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { DepartmentInfoModel } from './department-info.model';

// @dynamic
@ModelMapping(
  DepartmentGetResponse, DepartmentGetResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(DepartmentInfoModel, bean.datas);
  }
)
export class DepartmentGetResponseModel {

  @ValidateNested()
  public datas: Array<DepartmentInfoModel>;

}
