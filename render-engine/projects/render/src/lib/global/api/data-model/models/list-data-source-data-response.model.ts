import { ListDataSourceDataResponse } from '../../neuxAPI/bean/ListDataSourceDataResponse';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  ListDataSourceDataResponse, ListDataSourceDataResponseModel,
  (bean, model) => {
    (model as any).datas = bean.datas as any[];
  }
)
export class ListDataSourceDataResponseModel<T> {

  public datas: Array<T>;

}
