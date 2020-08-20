import { ValidateNested, IsNotEmpty } from 'class-validator';
import { ListContentDataSourceResponse } from '../../neuxAPI/bean/ListContentDataSourceResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { ContentDataSourceModel } from './content-data-source.model';

// @dynamic
@ModelMapping(
  ListContentDataSourceResponse, ListContentDataSourceResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(ContentDataSourceModel, bean.datas);
  }
)
export class ListContentDataSourceResponseModel {

  @ValidateNested()
  @IsNotEmpty()
  public datas: Array<ContentDataSourceModel>;

}
