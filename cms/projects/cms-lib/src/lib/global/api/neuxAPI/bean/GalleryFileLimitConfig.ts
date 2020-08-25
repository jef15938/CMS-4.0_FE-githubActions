import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class GalleryFileLimitConfig {

@IsNotEmpty()
public file_name_ext: string;
@IsNotEmpty()
public max_file_size: number;


}