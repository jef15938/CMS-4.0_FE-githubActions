import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class UserSiteMapPutRequest {

@IsNotEmpty()
public node_name: string;
@IsNotEmpty()
public node_orders: string;
public parent_id: string;
public url_type: string;
public url_link_node_id: string;
public url: string;
public url_blank: string;
public content_path: string;
@IsNotEmpty()
public meta_title: string;
public meta_description: string;
public meta_keyword: string;
public meta_image: string;


}