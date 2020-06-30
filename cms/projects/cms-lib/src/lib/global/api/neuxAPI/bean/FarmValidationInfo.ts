import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

import { TypeFactory } from '../type-factory';

export class FarmValidationInfo {

public required: Array<object>;
public email: Array<object>;
public alphanumeric: Array<object>;
public number: Array<object>;
public range: Array<object>;


}