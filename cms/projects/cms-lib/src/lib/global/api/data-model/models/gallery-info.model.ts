import { IsNotEmpty } from 'class-validator';
import { GalleryInfo } from '../../neuxAPI/bean/GalleryInfo';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  GalleryInfo, GalleryInfoModel,
  (bean, model) => {
    model.galleryId = bean.gallery_id;
    model.fileName = bean.file_name;
    model.size = bean.size;
    model.fileType = bean.file_type;
    model.createTime = bean.create_time;
    model.url = bean.url;
  }
)
export class GalleryInfoModel {

  @IsNotEmpty()
  public galleryId: number;
  @IsNotEmpty()
  public fileName: string;
  @IsNotEmpty()
  public size: string;
  @IsNotEmpty()
  public fileType: string;
  @IsNotEmpty()
  public createTime: string;
  @IsNotEmpty()
  public url: string;

}
