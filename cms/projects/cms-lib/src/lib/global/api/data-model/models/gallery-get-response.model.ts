import { ValidateNested } from 'class-validator';
import { GalleryGetResponse } from '../../neuxAPI/bean/GalleryGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { GalleryInfoModel } from './gallery-info.model';
import { PageInfoModel } from './page-info.model';

// @dynamic
@ModelMapping(
  GalleryGetResponse, GalleryGetResponseModel,
  (bean, model) => {
    model.pageInfo = ModelMapper.mapModelTo(PageInfoModel, bean.pageInfo);
    model.datas = ModelMapper.mapArrayTo(GalleryInfoModel, bean.datas);
  }
)
export class GalleryGetResponseModel {

  @ValidateNested()
  public pageInfo: PageInfoModel;
  @ValidateNested()
  public datas: Array<GalleryInfoModel>;

}
