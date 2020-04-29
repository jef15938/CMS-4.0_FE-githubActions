import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {MenuInfo} from './MenuInfo';
import {GenerationHeader} from './GenerationHeader';


export class MenuGetResponse {

@Type(() => GenerationHeader)
@ValidateNested()
public header: GenerationHeader;
@Type(() => MenuInfo)
@ValidateNested()
public body: Array<MenuInfo>;


}