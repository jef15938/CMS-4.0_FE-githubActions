import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class SaveGalleryResponse {

@IsNotEmpty()
public original_gallery_id: number;
@IsNotEmpty()
public gallery_id: number;
@IsNotEmpty()
public success: boolean;
@IsNotEmpty()
public identity: string;
@IsNotEmpty()
public original_path: string;
@IsNotEmpty()
public path: string;


}