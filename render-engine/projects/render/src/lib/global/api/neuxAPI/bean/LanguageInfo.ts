import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {ContentTemplateInfo} from './ContentTemplateInfo';

import { TypeFactory } from '../type-factory';
import { ContentBlockInfo } from './ContentBlockInfo';

export class LanguageInfo {

@IsNotEmpty()
public language_id: string;
@IsNotEmpty()
public language_name: string;
@Type(TypeFactory(ContentBlockInfo))
@ValidateNested()
@IsNotEmpty()
public blocks: Array<ContentBlockInfo>;


}
