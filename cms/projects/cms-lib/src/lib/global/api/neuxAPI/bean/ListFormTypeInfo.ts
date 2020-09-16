import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class ListFormTypeInfo {

@IsNotEmpty()
public id: string;
@IsNotEmpty()
public name: string;


}