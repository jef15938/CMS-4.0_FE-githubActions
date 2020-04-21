import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {GalleryCategoryInfo} from './GalleryCategoryInfo';
import {GenerationHeader} from './GenerationHeader';


export class GalleryCategoryPushResponse {

@Type(() => GenerationHeader)
@ValidateNested()
public header: GenerationHeader;
@Type(() => GalleryCategoryInfo)
@ValidateNested()
public body: GalleryCategoryInfo;


}