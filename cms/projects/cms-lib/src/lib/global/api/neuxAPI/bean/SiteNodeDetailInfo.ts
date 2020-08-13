import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class SiteNodeDetailInfo {

@IsNotEmpty()
public language_id: string;
@IsNotEmpty()
public language_name: string;
@IsNotEmpty()
public node_name: string;
public meta_title: string;
public meta_description: string;
public meta_keyword: string;
public meta_image: string;
public meta_image_name: string;
public is_default: boolean;


}