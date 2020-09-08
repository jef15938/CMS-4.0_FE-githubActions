import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class SiteMapGetResponse {

@IsNotEmpty()
public node_id: string;
@IsNotEmpty()
public node_name: string;
public url: string;
public url_blank: string;
@Type(TypeFactory(SiteMapGetResponse))
@ValidateNested()
public children: Array<SiteMapGetResponse>;
@IsNotEmpty()
public content_id: string;
@IsNotEmpty()
public content_path: string;

}
