import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {ListFormTypeInfo} from './ListFormTypeInfo';

import { TypeFactory } from '../type-factory';

export class ListFormTypeResponse {

@Type(TypeFactory(ListFormTypeInfo))
@ValidateNested()
@IsNotEmpty()
public datas: Array<ListFormTypeInfo>;


}