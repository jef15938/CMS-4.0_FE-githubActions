import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {MenuInfo} from './MenuInfo';


export class MenuGetResponse {

@Type(() => MenuInfo)
@ValidateNested()
public datas: Array<MenuInfo>;


}