import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class NewsInfo {

@IsNotEmpty()
public id: string;
@IsNotEmpty()
public title: string;
@IsNotEmpty()
public start_date: string;
@IsNotEmpty()
public url: string;
public url_blank: boolean;
public description: string;


}