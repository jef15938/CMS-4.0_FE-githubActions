import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class FullSearchInfo {

@IsNotEmpty()
public id: string;
@IsNotEmpty()
public title: string;
public search_text: string;
@IsNotEmpty()
public url: string;
public type_id: string;


}