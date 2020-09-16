import { ModelMapping } from '@neux/core';
import { SaveGalleryResponse } from '../../neuxAPI/bean/SaveGalleryResponse';
import { IsNotEmpty } from 'class-validator';

// @dynamic
@ModelMapping(
  SaveGalleryResponse, SaveGalleryResponseModel,
  (bean, model) => {
    model.originalGalleryId = bean.original_gallery_id;
    model.galleryId = bean.gallery_id;
    model.success = bean.success;
    model.identity = bean.identity;
    model.originalPath = bean.original_path;
    model.path = bean.path;
  }
)
export class SaveGalleryResponseModel {

  @IsNotEmpty()
  public originalGalleryId: number;
  @IsNotEmpty()
  public galleryId: number;
  @IsNotEmpty()
  public success: boolean;
  @IsNotEmpty()
  public identity: string;
  @IsNotEmpty()
  public originalPath: string;
  @IsNotEmpty()
  public path: string;

}
