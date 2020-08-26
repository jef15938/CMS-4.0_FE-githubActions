import { ListDataSourceDataResponse } from '../../neuxAPI/bean/ListDataSourceDataResponse';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  ListDataSourceDataResponse, ListDataSourceDataResponseModel,
  (bean, model) => {
    model.datas = bean.datas;
  }
)
export class ListDataSourceDataResponseModel {

  public datas: Array<string>;

}
