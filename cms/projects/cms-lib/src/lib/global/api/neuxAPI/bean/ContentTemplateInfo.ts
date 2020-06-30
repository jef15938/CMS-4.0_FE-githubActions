import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ContentFieldInfo } from './ContentFieldInfo';

import { TypeFactory } from '../type-factory';

export class ContentTemplateInfo {

  @IsNotEmpty()
  public id: string;
  @IsNotEmpty()
  public templateId: string;
  @Type(TypeFactory(ContentFieldInfo))
  @ValidateNested()
  @IsNotEmpty()
  public fields: Array<ContentFieldInfo>;
  @IsNotEmpty()
  public attributes: { [key: string]: string };


}
