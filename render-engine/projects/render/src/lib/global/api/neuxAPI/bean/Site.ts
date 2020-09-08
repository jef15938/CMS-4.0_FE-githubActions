import { Type } from 'class-transformer';
import { TypeFactory } from '../type-factory';
import { SiteMapGetResponse } from './SiteMapGetResponse';

export class Site {
  siteId: string;
  @Type(TypeFactory(SiteMapGetResponse))
  siteMap: SiteMapGetResponse[];
}
