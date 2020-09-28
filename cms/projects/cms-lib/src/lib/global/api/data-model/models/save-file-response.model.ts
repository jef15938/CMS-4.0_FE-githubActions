import { ModelMapping } from '@neux/core';
import { SaveFileResponse } from '../../neuxAPI/bean/SaveFileResponse';
import { IsNotEmpty } from 'class-validator';

// @dynamic
@ModelMapping(
  SaveFileResponse, SaveFileResponseModel,
  (bean, model) => {
    model.galleryId = bean.gallery_id;
    model.success = bean.success;
    model.identity = bean.identity;
    model.path = bean.path;
  }
)
export class SaveFileResponseModel {

  @IsNotEmpty()
  public galleryId: number;
  @IsNotEmpty()
  public success: boolean;
  @IsNotEmpty()
  public identity: string;
  @IsNotEmpty()
  public path: string;

}
