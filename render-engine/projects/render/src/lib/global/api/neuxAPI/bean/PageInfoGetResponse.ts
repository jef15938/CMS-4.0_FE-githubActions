import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class PageInfoGetResponse {

public layout_id: string;
@IsNotEmpty()
public meta_title: string;
public meta_description: string;
public meta_keyword: string;
public meta_image: string;
public content_id: string;
@IsNotEmpty()
public lang: string;
@IsNotEmpty()
public node_root: string;
public node_parent: string;
public domain: string;


}