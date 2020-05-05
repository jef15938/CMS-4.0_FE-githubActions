import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {ContentTemplateInfo} from './ContentTemplateInfo';


export class ContentInfo {

@Type(() => ContentTemplateInfo)
@ValidateNested()
public templates: Array<ContentTemplateInfo>;


}