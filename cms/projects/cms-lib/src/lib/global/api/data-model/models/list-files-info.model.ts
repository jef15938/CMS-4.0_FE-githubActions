import { IsNotEmpty } from 'class-validator';
import { ListFilesInfo } from '../../neuxAPI/bean/ListFilesInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  ListFilesInfo, ListFilesInfoModel,
  (bean, model) => {
    model.galleryId = bean.gallery_id;
    model.name = bean.name;
    model.path = bean.path;
  }
)
export class ListFilesInfoModel {

  @IsNotEmpty()
  public galleryId: number;
  @IsNotEmpty()
  public name: string;
  @IsNotEmpty()
  public path: string;

}
