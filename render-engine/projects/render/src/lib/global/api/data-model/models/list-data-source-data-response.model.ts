import { ListDataSourceDataResponse } from '../../neuxAPI/bean/ListDataSourceDataResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { IsNotEmpty } from 'class-validator';
import { PageInfoModel } from './page-info.model';

// @dynamic
@ModelMapping(
  ListDataSourceDataResponse, ListDataSourceDataResponseModel,
  (bean, model) => {
    (model as any).datas = bean.datas as any[];
    (model as any).pageInfo = ModelMapper.mapModelTo(PageInfoModel, bean.pageInfo);
  }
)
export class ListDataSourceDataResponseModel<T> {

  public datas: Array<T>;
  @IsNotEmpty()
  public pageInfo: PageInfoModel;

}
