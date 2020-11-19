import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class DownloadObject {

public id: string;
@IsNotEmpty()
public title: string;
@IsNotEmpty()
public url: string;
public url_extension: string;


}