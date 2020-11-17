import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class ShortCutObject {

@IsNotEmpty()
public title: string;
@IsNotEmpty()
public icon_url: string;
@IsNotEmpty()
public url: string;
@IsNotEmpty()
public url_blank: boolean;


}