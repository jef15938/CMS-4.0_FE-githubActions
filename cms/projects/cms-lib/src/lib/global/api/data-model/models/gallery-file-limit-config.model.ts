import { IsNotEmpty } from 'class-validator';
import { GalleryFileLimitConfig } from '../../neuxAPI/bean/GalleryFileLimitConfig';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  GalleryFileLimitConfig, GalleryFileLimitConfigModel,
  (bean, model) => {
    model.fileNameExt = bean.file_name_ext;
    model.maxFileSize = bean.max_file_size;
  }
)
export class GalleryFileLimitConfigModel {

  @IsNotEmpty()
  public fileNameExt: string;
  @IsNotEmpty()
  public maxFileSize: number;

}
