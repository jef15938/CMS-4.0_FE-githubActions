import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {GroupSitemapInfo} from './GroupSitemapInfo';

import { TypeFactory } from '../type-factory';

export class GroupSiteMapGetResponse {

@Type(TypeFactory(GroupSitemapInfo))
@ValidateNested()
public datas: Array<GroupSitemapInfo>;


}