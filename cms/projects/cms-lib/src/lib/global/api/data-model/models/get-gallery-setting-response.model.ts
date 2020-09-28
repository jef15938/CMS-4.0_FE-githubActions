import { IsNotEmpty } from 'class-validator';
import { GetGallerySettingResponse } from '../../neuxAPI/bean/GetGallerySettingResponse';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  GetGallerySettingResponse, GetGallerySettingResponseModel,
  (bean, model) => {
    model.cropSetting = bean.crop_setting ? JSON.parse(bean.crop_setting) : null;
  }
)
export class GetGallerySettingResponseModel {

  @IsNotEmpty()
  public cropSetting: any;

}
