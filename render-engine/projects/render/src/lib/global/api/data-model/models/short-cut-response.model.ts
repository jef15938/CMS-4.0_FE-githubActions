import { ModelMapping, ModelMapper } from '@neux/core';
import { ShortCutResponse } from '../../neuxAPI/bean/ShortCutResponse';
import { ShortCutObjectModel } from './short-cut-object-model';

// @dynamic
@ModelMapping(
  ShortCutResponse, ShortCutResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(ShortCutObjectModel, bean.datas);
  }
)
export class ShortCutResponseModel {
  public datas: Array<ShortCutObjectModel>;
}
