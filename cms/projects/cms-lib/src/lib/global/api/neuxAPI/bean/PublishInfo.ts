import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

import { TypeFactory } from '../type-factory';

export class PublishInfo {

public draft: object;
public pending_published: object;
public published: object;


}