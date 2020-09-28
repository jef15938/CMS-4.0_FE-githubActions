import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class SlideInfo {

@IsNotEmpty()
public id: string;
@IsNotEmpty()
public title: string;
public description: string;
@IsNotEmpty()
public url: string;
@IsNotEmpty()
public picture: string;


}