import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {GroupInfo} from './GroupInfo';

import { TypeFactory } from '../type-factory';

export class ListGroupResponst {

@Type(TypeFactory(GroupInfo))
@ValidateNested()
public datas: Array<GroupInfo>;


}