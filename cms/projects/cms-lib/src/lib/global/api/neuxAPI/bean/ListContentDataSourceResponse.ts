import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {ContentDataSourceAction} from './ContentDataSourceAction';
import {ContentDataSource} from './ContentDataSource';

import { TypeFactory } from '../type-factory';

export class ListContentDataSourceResponse {

@Type(TypeFactory(ContentDataSource))
@ValidateNested()
@IsNotEmpty()
public datas: Array<ContentDataSource>;
@Type(TypeFactory(ContentDataSourceAction))
@ValidateNested()
@IsNotEmpty()
public actions: Array<ContentDataSourceAction>;


}