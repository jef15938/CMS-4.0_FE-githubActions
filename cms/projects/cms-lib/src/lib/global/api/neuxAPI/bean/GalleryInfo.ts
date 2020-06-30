import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class GalleryInfo {

@IsNotEmpty()
public gallery_id: number;
@IsNotEmpty()
public file_name: string;
@IsNotEmpty()
public size: string;
@IsNotEmpty()
public file_type: string;
@IsNotEmpty()
public create_time: string;


}