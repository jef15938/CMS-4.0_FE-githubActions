import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteMapInfo} from './SiteMapInfo';

import { TypeFactory } from '../type-factory';

export class SiteMapGetResponse {

@Type(TypeFactory(SiteMapInfo))
@ValidateNested()
public datas: Array<SiteMapInfo>;


}