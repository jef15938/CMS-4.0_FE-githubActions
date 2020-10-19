import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {ListFilesInfo} from './ListFilesInfo';

import { TypeFactory } from '../type-factory';

export class ListFilesResponse {

@Type(TypeFactory(ListFilesInfo))
@ValidateNested()
@IsNotEmpty()
public datas: Array<ListFilesInfo>;


}