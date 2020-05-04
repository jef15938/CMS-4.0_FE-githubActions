import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteMapInfo} from './SiteMapInfo';


export class SiteMapGetResponse {

@Type(() => SiteMapInfo)
@ValidateNested()
public datas: Array<SiteMapInfo>;


}