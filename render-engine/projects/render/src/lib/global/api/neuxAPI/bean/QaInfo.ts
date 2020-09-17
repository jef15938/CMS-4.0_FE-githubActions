import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class QaInfo {

@IsNotEmpty()
public id: string;
@IsNotEmpty()
public question: string;
@IsNotEmpty()
public answer: string;


}