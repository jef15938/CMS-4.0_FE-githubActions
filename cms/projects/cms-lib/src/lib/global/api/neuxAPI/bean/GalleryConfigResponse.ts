import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {GalleryFileLimitConfig} from './GalleryFileLimitConfig';

import { TypeFactory } from '../type-factory';

export class GalleryConfigResponse {

@IsNotEmpty()
public max_upload_number: number;
@IsNotEmpty()
public max_upload_size: number;
@IsNotEmpty()
public limit_character: string;
@Type(TypeFactory(GalleryFileLimitConfig))
@ValidateNested()
@IsNotEmpty()
public file_limits: Array<GalleryFileLimitConfig>;
@IsNotEmpty()
public img_filename_ext: string;


}