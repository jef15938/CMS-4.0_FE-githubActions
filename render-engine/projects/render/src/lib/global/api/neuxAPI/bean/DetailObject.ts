import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class DetailObject {

@IsNotEmpty()
public content_id: string;
@IsNotEmpty()
public content_json: string;


}