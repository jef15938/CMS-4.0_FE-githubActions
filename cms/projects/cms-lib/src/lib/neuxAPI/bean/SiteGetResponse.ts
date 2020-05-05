import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteInfo} from './SiteInfo';


export class SiteGetResponse {

@Type(() => SiteInfo)
@ValidateNested()
public datas: Array<SiteInfo>;


}