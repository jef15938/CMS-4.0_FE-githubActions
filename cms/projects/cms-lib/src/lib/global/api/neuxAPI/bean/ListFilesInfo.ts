import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class ListFilesInfo {

@IsNotEmpty()
public gallery_id: number;
@IsNotEmpty()
public name: string;
@IsNotEmpty()
public path: string;


}