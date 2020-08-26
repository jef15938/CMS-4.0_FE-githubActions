import { ValidateNested, IsNotEmpty } from 'class-validator';
import { ListContentDataSourceResponse } from '../../neuxAPI/bean/ListContentDataSourceResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { ContentDataSourceModel } from './content-data-source.model';
import { ContentDataSourceActionModel } from './content-data-source-action.model';

// @dynamic
@ModelMapping(
  ListContentDataSourceResponse, ListContentDataSourceResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(ContentDataSourceModel, bean.datas);
    model.actions = ModelMapper.mapArrayTo(ContentDataSourceActionModel, bean.actions);
  }
)
export class ListContentDataSourceResponseModel {

  @ValidateNested()
  @IsNotEmpty()
  public datas: Array<ContentDataSourceModel>;
  @ValidateNested()
  @IsNotEmpty()
  public actions: Array<ContentDataSourceActionModel>;

}
