import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {GroupMenuInfo} from './GroupMenuInfo';

import { TypeFactory } from '../type-factory';

export class GroupMenuGetResponse {

@Type(TypeFactory(GroupMenuInfo))
@ValidateNested()
public datas: Array<GroupMenuInfo>;


}