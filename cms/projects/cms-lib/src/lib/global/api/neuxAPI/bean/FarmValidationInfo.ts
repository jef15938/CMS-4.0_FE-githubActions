import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

import { TypeFactory } from '../type-factory';

export class FarmValidationInfo {

public required: Array<string>;
public email: Array<string>;
public alphanumeric: Array<string>;
public number: Array<string>;
public range: Array<object>;


}