import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class SiteMapGetResponse {

@IsNotEmpty()
public node_id: string;
@IsNotEmpty()
public node_name: string;
@IsNotEmpty()
public canModify: boolean;
@IsNotEmpty()
public canSubmit: boolean;
@IsNotEmpty()
public canPreview: boolean;
@Type(TypeFactory(SiteMapGetResponse))
@ValidateNested()
public children: Array<SiteMapGetResponse>;


}