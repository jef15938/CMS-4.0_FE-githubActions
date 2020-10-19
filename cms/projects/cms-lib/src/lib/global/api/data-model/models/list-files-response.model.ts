import { ValidateNested } from 'class-validator';
import { ListFilesResponse } from '../../neuxAPI/bean/ListFilesResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { ListFilesInfoModel } from './list-files-info.model';

// @dynamic
@ModelMapping(
  ListFilesResponse, ListFilesResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(ListFilesInfoModel, bean.datas);
  }
)
export class ListFilesResponseModel {

  @ValidateNested()
  public datas: Array<ListFilesInfoModel>;

}
