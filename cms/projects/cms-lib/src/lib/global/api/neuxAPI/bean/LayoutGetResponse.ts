import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {LayoutInfo} from './LayoutInfo';

import { TypeFactory } from '../type-factory';

export class LayoutGetResponse {

@Type(TypeFactory(LayoutInfo))
@ValidateNested()
public datas: Array<LayoutInfo>;


}