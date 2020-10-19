import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteMapInfo} from './SiteMapInfo';

import { TypeFactory } from '../type-factory';

export class SiteInfo {

public siteId: string;
@Type(TypeFactory(SiteMapInfo))
@ValidateNested()
public siteMap: Array<SiteMapInfo>;


}