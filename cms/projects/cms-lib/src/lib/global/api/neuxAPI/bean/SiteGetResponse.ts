import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteInfo} from './SiteInfo';

import { TypeFactory } from '../type-factory';

export class SiteGetResponse {

@Type(TypeFactory(SiteInfo))
@ValidateNested()
public datas: Array<SiteInfo>;


}