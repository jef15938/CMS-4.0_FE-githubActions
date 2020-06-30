import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ContentTemplateInfo } from './ContentTemplateInfo';
import { TypeFactory } from '../type-factory';


export class ContentInfo {

  @Type(TypeFactory(ContentTemplateInfo))
  @ValidateNested()
  public templates: Array<ContentTemplateInfo>;


}
