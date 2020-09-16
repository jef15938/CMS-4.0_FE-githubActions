import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class SaveFileResponse {

@IsNotEmpty()
public gallery_id: number;
@IsNotEmpty()
public path: string;
@IsNotEmpty()
public success: boolean;
@IsNotEmpty()
public identity: string;


}