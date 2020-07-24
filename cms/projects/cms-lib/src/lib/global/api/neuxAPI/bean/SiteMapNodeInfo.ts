import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {PublishInfo} from './PublishInfo';

import { TypeFactory } from '../type-factory';

export class SiteMapNodeInfo {

@IsNotEmpty()
public node_id: string;
@IsNotEmpty()
public node_name: string;
public layout_id: string;
public node_type: string;
public func_id: string;
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
public version: string;
@IsNotEmpty()
public canModify: boolean;
@IsNotEmpty()
public canSubmit: boolean;
@IsNotEmpty()
public create_by: string;
@IsNotEmpty()
public create_time: string;
@IsNotEmpty()
public update_by: string;
@IsNotEmpty()
public update_time: string;
@Type(TypeFactory(PublishInfo))
@ValidateNested()
public publish_info: PublishInfo;


}