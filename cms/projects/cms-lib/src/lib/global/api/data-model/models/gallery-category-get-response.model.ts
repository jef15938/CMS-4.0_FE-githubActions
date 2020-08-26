import { ValidateNested } from 'class-validator';
import { GalleryCaregoryGetResponse } from '../../neuxAPI/bean/GalleryCaregoryGetResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { GalleryCategoryInfoModel } from './gallery-category-info.model';

// @dynamic
@ModelMapping(
  GalleryCaregoryGetResponse, GalleryCategoryGetResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(GalleryCategoryInfoModel, bean.datas);
  }
)
export class GalleryCategoryGetResponseModel {

  @ValidateNested()
  public datas: Array<GalleryCategoryInfoModel>;

}
