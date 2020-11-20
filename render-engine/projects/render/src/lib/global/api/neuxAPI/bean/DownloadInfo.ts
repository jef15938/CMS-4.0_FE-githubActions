import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {DownloadObject} from './DownloadObject';

import { TypeFactory } from '../type-factory';

export class DownloadInfo {

@IsNotEmpty()
public type_id: string;
@IsNotEmpty()
public type_name: string;
@Type(TypeFactory(DownloadObject))
@ValidateNested()
public downloads: DownloadObject;


}