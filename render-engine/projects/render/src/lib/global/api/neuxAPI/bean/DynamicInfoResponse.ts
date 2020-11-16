import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {PageInfoGetResponse} from './PageInfoGetResponse';

import { TypeFactory } from '../type-factory';

export class DynamicInfoResponse {

@Type(TypeFactory(PageInfoGetResponse))
@ValidateNested()
public page_info: PageInfoGetResponse;
public content_json: string;


}