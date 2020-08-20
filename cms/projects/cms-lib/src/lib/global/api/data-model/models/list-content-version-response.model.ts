import { ValidateNested } from 'class-validator';
import { ListContentVersionResponse } from '../../neuxAPI/bean/ListContentVersionResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { ContentVersionInfoModel } from './content-version-info.model';

// @dynamic
@ModelMapping(
  ListContentVersionResponse, ListContentVersionResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(ContentVersionInfoModel, bean.datas);
  }
)
export class ListContentVersionResponseModel {

  @ValidateNested()
  public datas: Array<ContentVersionInfoModel>;

}
