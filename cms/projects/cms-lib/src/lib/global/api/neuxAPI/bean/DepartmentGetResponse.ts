import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {DepartmentInfo} from './DepartmentInfo';

import { TypeFactory } from '../type-factory';

export class DepartmentGetResponse {

@Type(TypeFactory(DepartmentInfo))
@ValidateNested()
public datas: Array<DepartmentInfo>;


}