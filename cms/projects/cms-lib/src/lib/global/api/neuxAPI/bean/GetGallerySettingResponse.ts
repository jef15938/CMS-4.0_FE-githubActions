import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class GetGallerySettingResponse {

@IsNotEmpty()
public crop_setting: string;


}