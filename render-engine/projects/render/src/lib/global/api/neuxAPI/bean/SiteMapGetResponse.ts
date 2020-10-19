import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteInfo} from './SiteInfo';

import { TypeFactory } from '../type-factory';

export class SiteMapGetResponse {

@Type(TypeFactory(SiteInfo))
@ValidateNested()
public sites: Array<SiteInfo>;


}