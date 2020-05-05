import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {ContentFieldInfo} from './ContentFieldInfo';


export class ContentTemplateInfo {

@IsNotEmpty()
public id: string;
@IsNotEmpty()
public templateId: string;
@Type(() => ContentFieldInfo)
@ValidateNested()
@IsNotEmpty()
public fields: Array<ContentFieldInfo>;
@IsNotEmpty()
public attributes: object;


}