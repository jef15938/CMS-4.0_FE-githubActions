import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteNodeDetailInfo} from './SiteNodeDetailInfo';

import { TypeFactory } from '../type-factory';

export class UserSiteMapPutRequest {

public is_mega_menu: boolean;
public parent_id: string;
public url_type: string;
public url_link_node_id: string;
public url: string;
public url_blank: string;
public content_path: string;
@Type(TypeFactory(SiteNodeDetailInfo))
@ValidateNested()
public details: Array<SiteNodeDetailInfo>;


}
