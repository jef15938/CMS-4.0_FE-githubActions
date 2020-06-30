import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GalleryInfo } from './GalleryInfo';
import { PageInfo } from './PageInfo';
import { TypeFactory } from '../type-factory';


export class GalleryGetResponse {

  @Type(TypeFactory(PageInfo))
  @ValidateNested()
  public pageInfo: PageInfo;
  @Type(TypeFactory(GalleryInfo))
  @ValidateNested()
  public datas: Array<GalleryInfo>;


}
