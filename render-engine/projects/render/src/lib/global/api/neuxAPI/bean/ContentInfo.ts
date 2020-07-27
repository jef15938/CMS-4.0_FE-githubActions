import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {LanguageInfo} from './LanguageInfo';

import { TypeFactory } from '../type-factory';

export class ContentInfo {

@Type(TypeFactory(LanguageInfo))
@ValidateNested()
public languages: Array<LanguageInfo>;


}