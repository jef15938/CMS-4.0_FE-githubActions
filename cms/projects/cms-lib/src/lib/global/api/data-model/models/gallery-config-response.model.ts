import { ValidateNested, IsNotEmpty } from 'class-validator';
import { GalleryConfigResponse } from '../../neuxAPI/bean/GalleryConfigResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { GalleryFileLimitConfigModel } from './gallery-file-limit-config.model';

// @dynamic
@ModelMapping(
  GalleryConfigResponse, GalleryConfigResponseModel,
  (bean, model) => {
    model.maxUploadNumber = bean.max_upload_number;
    model.maxUploadSize = bean.max_upload_size;
    model.limitCharacter = bean.limit_character;
    model.fileLimits = ModelMapper.mapArrayTo(GalleryFileLimitConfigModel, bean.file_limits);
  }
)
export class GalleryConfigResponseModel {

  @IsNotEmpty()
  public maxUploadNumber: number;
  @IsNotEmpty()
  public maxUploadSize: number;
  @IsNotEmpty()
  public limitCharacter: string;
  @ValidateNested()
  @IsNotEmpty()
  public fileLimits: Array<GalleryFileLimitConfigModel>;

}
