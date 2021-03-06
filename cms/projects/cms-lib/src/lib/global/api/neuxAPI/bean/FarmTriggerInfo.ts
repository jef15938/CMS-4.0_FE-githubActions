import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

import { TypeFactory } from '../type-factory';

export class FarmTriggerInfo {

@IsNotEmpty()
public trigger_type: string;
@IsNotEmpty()
public trigger_target: Array<string>;
public trigger_setting: object;


}