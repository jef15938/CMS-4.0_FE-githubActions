import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class PreviewInfo {

@IsNotEmpty()
public preview_type: string;
public url: string;
public func_id: string;


}