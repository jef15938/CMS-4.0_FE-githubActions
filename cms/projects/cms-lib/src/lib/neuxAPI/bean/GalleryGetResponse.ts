import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {GalleryInfo} from './GalleryInfo';
import {PageInfo} from './PageInfo';


export class GalleryGetResponse {

@Type(() => PageInfo)
@ValidateNested()
public pageInfo: PageInfo;
@Type(() => GalleryInfo)
@ValidateNested()
public datas: Array<GalleryInfo>;


}