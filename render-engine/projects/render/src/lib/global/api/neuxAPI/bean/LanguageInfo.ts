import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {ContentTemplateInfo} from './ContentTemplateInfo';

import { TypeFactory } from '../type-factory';

export class LanguageInfo {

@IsNotEmpty()
public language_id: string;
@IsNotEmpty()
public language_name: string;
@Type(TypeFactory(ContentTemplateInfo))
@ValidateNested()
public templates: Array<ContentTemplateInfo>;


}