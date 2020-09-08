import { Type } from 'class-transformer';
import { TypeFactory } from '../type-factory';
import { Site } from './Site';

export class SitesResponse {
  @Type(TypeFactory(Site))
  sites: Site[];
}
