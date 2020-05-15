import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {TemplateInfo} from './TemplateInfo';


export class TemplateGetResponse {

@Type(() => TemplateInfo)
@ValidateNested()
public static: Array<TemplateInfo>;
@Type(() => TemplateInfo)
@ValidateNested()
public tab: Array<TemplateInfo>;
@Type(() => TemplateInfo)
@ValidateNested()
public dynamic: Array<TemplateInfo>;
@Type(() => TemplateInfo)
@ValidateNested()
public customize: Array<TemplateInfo>;


}