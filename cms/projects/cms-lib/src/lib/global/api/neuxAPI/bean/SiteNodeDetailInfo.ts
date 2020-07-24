import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class SiteNodeDetailInfo {

@IsNotEmpty()
public lang_id: string;
@IsNotEmpty()
public lang_name: string;
@IsNotEmpty()
public node_name: string;
public meta_title: string;
public meta_description: string;
public meta_keyword: string;
public meta_image: string;


}