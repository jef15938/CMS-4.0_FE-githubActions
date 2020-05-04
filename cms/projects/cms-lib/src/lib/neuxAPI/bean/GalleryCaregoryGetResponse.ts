import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {GalleryCategoryInfo} from './GalleryCategoryInfo';


export class GalleryCaregoryGetResponse {

@Type(() => GalleryCategoryInfo)
@ValidateNested()
public datas: Array<GalleryCategoryInfo>;


}