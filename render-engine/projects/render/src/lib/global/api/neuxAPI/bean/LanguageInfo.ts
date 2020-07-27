import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {ContentTemplateInfo} from './ContentTemplateInfo';

import { TypeFactory } from '../type-factory';

export class LanguageInfo {

public language_id: string;
public language_name: string;
@Type(TypeFactory(ContentTemplateInfo))
@ValidateNested()
public templates: Array<ContentTemplateInfo>;
public galleries: Array<string>;


}