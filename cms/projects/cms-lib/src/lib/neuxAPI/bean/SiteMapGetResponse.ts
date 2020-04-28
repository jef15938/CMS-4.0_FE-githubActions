import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteMapInfo} from './SiteMapInfo';
import {GenerationHeader} from './GenerationHeader';


export class SiteMapGetResponse {

@Type(() => GenerationHeader)
@ValidateNested()
public header: GenerationHeader;
@Type(() => SiteMapInfo)
@ValidateNested()
public body: Array<SiteMapInfo>;


}