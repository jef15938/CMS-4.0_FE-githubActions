import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GalleryCategoryInfo } from './GalleryCategoryInfo';
import { TypeFactory } from '../type-factory';


export class GalleryCaregoryGetResponse {

  @Type(TypeFactory(GalleryCategoryInfo))
  @ValidateNested()
  public datas: Array<GalleryCategoryInfo>;


}
