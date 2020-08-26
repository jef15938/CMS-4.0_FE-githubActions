import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {ContentTemplateInfo} from './ContentTemplateInfo';

import { TypeFactory } from '../type-factory';

export class ContentBlockInfo {

@IsNotEmpty()
public block_id: string;
@Type(TypeFactory(ContentTemplateInfo))
@ValidateNested()
@IsNotEmpty()
public templates: Array<ContentTemplateInfo>;


}
