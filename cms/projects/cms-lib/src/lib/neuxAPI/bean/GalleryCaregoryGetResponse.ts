import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {GalleryCategoryInfo} from './GalleryCategoryInfo';
import {GenerationHeader} from './GenerationHeader';


export class GalleryCaregoryGetResponse {

@Type(() => GenerationHeader)
@ValidateNested()
public header: GenerationHeader;
@Type(() => GalleryCategoryInfo)
@ValidateNested()
public body: Array<GalleryCategoryInfo>;


}