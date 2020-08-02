import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {ContentVersionInfo} from './ContentVersionInfo';

import { TypeFactory } from '../type-factory';

export class ListContentVersionResponse {

@Type(TypeFactory(ContentVersionInfo))
@ValidateNested()
public datas: Array<ContentVersionInfo>;


}