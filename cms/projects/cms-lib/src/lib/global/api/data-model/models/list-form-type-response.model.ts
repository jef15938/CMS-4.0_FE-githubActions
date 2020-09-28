import { ValidateNested } from 'class-validator';
import { ListFormTypeResponse } from '../../neuxAPI/bean/ListFormTypeResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { ListFormTypeInfoModel } from './list-form-type-info.model';

// @dynamic
@ModelMapping(
  ListFormTypeResponse, ListFormTypeResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(ListFormTypeInfoModel, bean.datas);
  }
)
export class ListFormTypeResponseModel {

  @ValidateNested()
  public datas: Array<ListFormTypeInfoModel>;

}
